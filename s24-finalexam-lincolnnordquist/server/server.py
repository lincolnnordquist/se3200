from flask import Flask, request, jsonify, g, make_response
from inventory import InventoryDB
import bcrypt
import random

class MyFlask(Flask):
    def add_url_rule(self, rule, endpoint=None, view_func=None, **options):
        super().add_url_rule(rule, endpoint, view_func, provide_automatic_options=False, **options)

app = MyFlask(__name__)
db = InventoryDB("inventory.db")

@app.route("/tickets", methods=["GET"])
def retreive_orders_collection():
    db = InventoryDB("inventory.db")
    inventory = db.getTickets()
    return inventory, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/tickets", methods=["POST"])
def create_in_orders_collection():
    db = InventoryDB("inventory.db")
    # Check if the 'oompa' cookie is present and its value is 'loompa'
    if request.cookies.get('oompa') == 'loompa':
        return "The oompa loompas have already received your ticket.", 403

    entrant_name = request.form["entrant_name"]
    entrant_age = request.form["entrant_age"]
    guest_name = request.form["guest_name"]
    random_token = random.randint(0, 6)
    
    db.createTicket(entrant_name, entrant_age, guest_name, random_token)

    # Create the response and set the cookie
    response = make_response("Created", 201)
    response.set_cookie("oompa", "loompa", samesite="None", secure=True)
    response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
    response.headers["Access-Control-Allow-Credentials"] = "true"

    return response

@app.route("/<path:path>", methods=["OPTIONS"])
def cors_prelight(path):
    response_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }
    return "", 204, response_headers

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()