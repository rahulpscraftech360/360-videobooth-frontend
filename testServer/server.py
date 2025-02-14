from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'  # Directory to save uploaded videos
ALLOWED_EXTENSIONS = {'mp4', 'mov', 'avi'}  # Allowed video file extensions

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Helper function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle video upload
@app.route('/api/videos', methods=['POST'])
def upload_video():
    # Check if the request contains a file
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    file = request.files['video']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Check if the file has an allowed extension
    if file and allowed_file(file.filename):
        # Secure the filename to prevent directory traversal attacks
        filename = secure_filename(file.filename)
        # Save the file to the upload folder
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Return a success response
        return jsonify({'message': 'Video uploaded successfully', 'file_path': file_path}), 200
    else:
        return jsonify({'error': 'Invalid file type. Allowed types: mp4, mov, avi'}), 400

# Route to handle success page (optional)
@app.route('/success', methods=['GET'])
def success():
    return jsonify({'message': 'Video upload was successful!'}), 200

# Run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)