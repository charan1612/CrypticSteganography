# backend/steganography.py

from PIL import Image
import math

def encode_text_to_image(image_file, text):
    image = Image.open(image_file)
    if image.mode != 'RGB':
        image = image.convert('RGB')

    pixels = list(image.getdata())
    binary_text = ''.join([format(ord(char), '08b') for char in text])
    data_len = len(binary_text)

    if data_len > len(pixels) * 3:
        raise ValueError("Text is too long to encode in the provided image.")

    new_pixels = []
    data_index = 0

    for pixel in pixels:
        r, g, b = pixel
        if data_index < data_len:
            r = (r & ~1) | int(binary_text[data_index])
            data_index += 1
        if data_index < data_len:
            g = (g & ~1) | int(binary_text[data_index])
            data_index += 1
        if data_index < data_len:
            b = (b & ~1) | int(binary_text[data_index])
            data_index += 1
        new_pixels.append((r, g, b))

    if data_index < data_len:
        raise ValueError("Not enough pixels to encode the data.")

    encoded_image = Image.new(image.mode, image.size)
    encoded_image.putdata(new_pixels)
    return encoded_image

def decode_text_from_image(image_file):
    image = Image.open(image_file)
    if image.mode != 'RGB':
        image = image.convert('RGB')

    pixels = list(image.getdata())
    binary_data = ''

    for pixel in pixels:
        r, g, b = pixel
        binary_data += str(r & 1)
        binary_data += str(g & 1)
        binary_data += str(b & 1)

    # Split by 8 bits
    bytes_data = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    decoded_text = ''

    for byte in bytes_data:
        if len(byte) < 8:
            break
        decoded_text += chr(int(byte, 2))
        if decoded_text.endswith('###'):  # Delimiter for end of text
            decoded_text = decoded_text[:-3]
            break

    return decoded_text

def encode_image_to_image(carrier_file, hidden_file):
    carrier = Image.open(carrier_file)
    hidden = Image.open(hidden_file)

    if carrier.mode != 'RGB':
        carrier = carrier.convert('RGB')
    if hidden.mode != 'RGB':
        hidden = hidden.convert('RGB')

    carrier_pixels = list(carrier.getdata())
    hidden_pixels = list(hidden.getdata())

    if len(hidden_pixels) > len(carrier_pixels):
        raise ValueError("Hidden image is too large to encode in the carrier image.")

    new_pixels = []
    for i in range(len(hidden_pixels)):
        carrier_pixel = carrier_pixels[i]
        hidden_pixel = hidden_pixels[i]

        r = (carrier_pixel[0] & ~3) | (hidden_pixel[0] >> 6)
        g = (carrier_pixel[1] & ~3) | (hidden_pixel[1] >> 6)
        b = (carrier_pixel[2] & ~3) | (hidden_pixel[2] >> 6)

        new_pixels.append((r, g, b))

    # Append the remaining carrier pixels
    new_pixels.extend(carrier_pixels[len(hidden_pixels):])

    encoded_image = Image.new(carrier.mode, carrier.size)
    encoded_image.putdata(new_pixels)
    return encoded_image

def decode_image_from_image(stego_file, hidden_size):
    stego = Image.open(stego_file)
    if stego.mode != 'RGB':
        stego = stego.convert('RGB')

    stego_pixels = list(stego.getdata())
    hidden_pixels = []

    total_hidden_pixels = hidden_size[0] * hidden_size[1]

    if total_hidden_pixels > len(stego_pixels):
        raise ValueError("Hidden image size is too large for the provided stego image.")

    for i in range(total_hidden_pixels):
        stego_pixel = stego_pixels[i]
        r = (stego_pixel[0] & 3) << 6
        g = (stego_pixel[1] & 3) << 6
        b = (stego_pixel[2] & 3) << 6
        hidden_pixels.append((r, g, b))

    hidden_image = Image.new('RGB', hidden_size)
    hidden_image.putdata(hidden_pixels)
    return hidden_image
