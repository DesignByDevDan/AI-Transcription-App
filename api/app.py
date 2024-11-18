from flask import Flask
from server import app as server_app

# You can add other blueprints or API routes if necessary
if __name__ == "__main__":
    server_app.run(debug=True, host="0.0.0.0", port=5000)
