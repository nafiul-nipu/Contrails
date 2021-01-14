from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

@app.route('/backendscript', methods=['POST'])
@cross_origin()

def get_value():
    val_vechi = request.json
    sum = val_vechi[0] + val_vechi[1]
    return {"val": sum}

if __name__ == '__main__':
	app.run(debug=True)