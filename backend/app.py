# backend/app.py

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from steganography import encode_text_to_image, decode_text_from_image, encode_image_to_image, decode_image_from_image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Steganography Backend"

@app.route('/api/encode_text', methods=['POST'])
def encode_text():
    if 'image' not in request.files or 'message' not in request.form:
        return jsonify({'error': 'Image and message are required.'}), 400

    image = request.files['image']
    message = request.form['message']

    try:
        encoded_image = encode_text_to_image(image, message)
        img_io = io.BytesIO()
        encoded_image.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='encoded_image.png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/decode_text', methods=['POST'])
def decode_text():
    if 'image' not in request.files:
        return jsonify({'error': 'Image is required.'}), 400

    image = request.files['image']

    try:
        hidden_text = decode_text_from_image(image)
        return jsonify({'hidden_text': hidden_text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/encode_image', methods=['POST'])
def encode_image():
    if 'carrier_image' not in request.files or 'hidden_image' not in request.files:
        return jsonify({'error': 'Both carrier and hidden images are required.'}), 400

    carrier_image = request.files['carrier_image']
    hidden_image = request.files['hidden_image']

    try:
        encoded_image = encode_image_to_image(carrier_image, hidden_image)
        img_io = io.BytesIO()
        encoded_image.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='encoded_image.png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/decode_image', methods=['POST'])
def decode_image():
    if 'image' not in request.files:
        return jsonify({'error': 'Image is required.'}), 400

    image = request.files['image']
    hidden_width = request.form.get('width')
    hidden_height = request.form.get('height')

    if not hidden_width or not hidden_height:
        return jsonify({'error': 'Hidden image dimensions are required.'}), 400

    try:
        hidden_width = int(hidden_width)
        hidden_height = int(hidden_height)
        hidden_image = decode_image_from_image(image, (hidden_width, hidden_height))
        img_io = io.BytesIO()
        hidden_image.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='decoded_image.png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
