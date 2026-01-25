from flask import Flask, request, jsonify, render_template, redirect, url_for
from pymongo import MongoClient

# Custom Flask class
class Flask_Suri(Flask):
    pass

app = Flask_Suri(__name__)

# 🔹 MongoDB Atlas Connection
#client = MongoClient("YOUR_MONGODB_ATLAS_CONNECTION_STRING")
client = MongoClient("mongodb://localhost:27017")
db = client.assignment_db
collection = db.form_data

# 🔹 Home Page (Form)
@app.route("/", methods=["GET"])
def form():
    return render_template("index.html")

# 🔹 Submit Route
@app.route("/submit", methods=["POST"])
def submit():
    try:
        name = request.form.get("name")
        email = request.form.get("email")

        if not name or not email:
            return render_template("index.html", error="All fields are required")

        collection.insert_one({
            "name": name,
            "email": email
        })

        return redirect(url_for("success"))

    except Exception as e:
        return render_template("index.html", error=str(e))

# 🔹 Success Page
@app.route("/success")
def success():
    return render_template("success.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

