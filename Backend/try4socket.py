import sqlite3
from urllib.parse import urlparse
import requests
import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO
from imagine import Imagine
from imagine.styles import GenerationsStyle
from imagine.models import Status

app = Flask(__name__, static_folder='BikeImages')
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
client = Imagine(token="vk-kTysowd4SgPF10Dqja78RtB4S5xgO3btYDSS6yMGOkWT6")

mainUrl = 'http://localhost:1337/api/'


def connection():
    conn = sqlite3.connect('strapi4.db')
    return conn.cursor(), conn

def check_table_exists(table_name):
    c, conn = connection()
    c.execute(
        f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}'")
    result = c.fetchone()
    c.close()
    conn.close()
    if result:
        return True
    else:
        return False


def delete_entry(table_name, entry_id):
    c, conn = connection()
    c.execute(f"DELETE FROM {table_name} WHERE id=?", (entry_id,))
    conn.commit()
    conn.close()


def update_entry(table_name, entry_id, new_data):
    c, conn = connection()
    if 'image' in new_data:
        image_url = 'http://localhost:1337' + new_data['image']['formats']['small']['url']
        filename = f"BikeImages/{extract_filename_from_url(image_url)}"
        download_image(image_url, filename)
        new_data['image'] = "http://127.0.0.1:5000/" + filename
        
    fields_to_update = {key: value for key, value in new_data.items() if key not in [
        'createdAt', 'updatedAt', 'publishedAt']}
    set_clause = ', '.join(
        f"{field}=?" for field in fields_to_update.keys())
    values = tuple(fields_to_update.values())
    c.execute(
        f"UPDATE {table_name} SET {set_clause} WHERE id=?", values + (entry_id,))
    conn.commit()
    conn.close()
    
def create_entry(table_name, entry_data):
    c, conn = connection()
    if 'image' in entry_data:
        image_url = 'http://localhost:1337' + entry_data['image']['formats']['small']['url']
        filename = f"BikeImages/{extract_filename_from_url(image_url)}"
        download_image(image_url, filename)
        entry_data['image'] = "http://127.0.0.1:5000/" + filename  #here we are updating the data['image'] thats why we are getting image url of flask in below print statement of webhook

    exclude_fields = {'createdAt', 'updatedAt', 'publishedAt'}

    fields = ', '.join([key for key in entry_data.keys() if key not in exclude_fields])
    placeholders = ', '.join(['?' for key in entry_data.keys() if key not in exclude_fields])
    values = tuple(entry_data[key] for key in entry_data.keys() if key not in exclude_fields)

    c.execute(f"INSERT INTO {table_name} ({fields}) VALUES ({placeholders})", values)
    conn.commit()
    conn.close()

def categotywise(category):
    c, conn = connection()
    c.execute("SELECT * FROM bikeinfo WHERE category=?", (category,))
    rows = c.fetchall()
    conn.close()
    bikeslist = []
    for row in rows:
        bikeslist.append({
            'id': row[0],
            'name': row[1],
            'description': row[2],
            'price': row[3],
            'engine': row[4],
            'mileage': row[5],
            'transmission': row[6],
            'weight': row[7],
            'fuel_tank': row[8],
            'seat_height': row[9],
            'category': row[10],
            'image': row[11],
        })
    return bikeslist
    

def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)


def extract_filename_from_url(url):
    parsed_url = urlparse(url)
    return os.path.basename(parsed_url.path)

def get_table_data(table_name):
    c, conn = connection()
    c.execute(f"SELECT * FROM {table_name}")
    rows = c.fetchall()
    conn.close()
    
    c,conn = connection()
    c.execute(f"PRAGMA table_info({table_name})")      #This is an SQLite-specific SQL statement that returns metadata about the columns in the specified table (table_name).
    columns = [info[1] for info in c.fetchall()]
    conn.close()
    
    data_list = []
    for row in rows:
        row_dict = {columns[i]: row[i] for i in range(len(columns))}
        data_list.append(row_dict)
        
    return jsonify(data_list)

@app.route('/sports', methods=['GET'])
def get_sports():
    sports_bikes = categotywise('sports')
    return jsonify(sports_bikes)

@app.route('/adventure', methods=['GET'])
def get_adventure():
    adventure_bikes = categotywise('adventure')
    return jsonify(adventure_bikes)

@app.route('/cruiser', methods=['GET'])
def get_cruiser():
    cruiser_bikes = categotywise('cruiser')
    return jsonify(cruiser_bikes)

@app.route('/electric', methods=['GET'])
def get_electric():
    electric_bikes = categotywise('electric')
    return jsonify(electric_bikes)

@app.route('/data/<table_name>', methods=['GET'])
def get_data_table(table_name):
    return get_table_data(table_name)
        

@app.route('/getai', methods=['POST'])
def generate_image():
    if request.method=='POST':
        data = request.json
        prompt = data['prompt']
        response = client.generations(
            prompt=prompt,
            style=GenerationsStyle.IMAGINE_V4,
        )

        if response.status == Status.OK:
            image = response.data
            image.as_file(f"BikeImages/Aiimages/{prompt}.webp")
            return jsonify({'image_url':f"http://127.0.0.1:5000/BikeImages/Aiimages/{prompt}.webp"}) 
        else:
            return jsonify({'error': f"Error occurred at AI side, Status Code: {response.status.value}"}), 500

@app.route('/bikesinfo/<int:id>', methods=['GET'])
def get_bike_by_id(id):
    c, conn = connection()
    c.execute(f"SELECT * FROM bikeinfo where id={id} ")
    row = c.fetchone()
    conn.close()
    bike_indi = []
    bike_indi.append({
            'id': row[0],
            'name': row[1],
            'description': row[2],
            'price': row[3],
            'engine': row[4],
            'mileage': row[5],
            'transmission': row[6],
            'weight': row[7],
            'fuel_tank': row[8],
            'seat_height': row[9],
            'category': row[10],
            'image': row[11],
        })
    return jsonify(bike_indi)


@app.route('/webhook', methods=['POST'])
def webhook_handler():
    data = request.json
    table_name = data['model']
    event_type = data['event']
    entry_data = data['entry']

    if event_type == "entry.create":
        if not check_table_exists(table_name):
            create_table = "CREATE TABLE IF NOT EXISTS {} (id INT PRIMARY KEY)".format(table_name)
            c, conn = connection()
            c.execute(create_table)

            
            for key, value in entry_data.items():    # Extract column names and data types from entry dictionary
                if key in ['id', 'createdAt', 'updatedAt', 'publishedAt']:
                    continue
                if isinstance(value, int):
                    data_type = "INT"
                elif isinstance(value, float):
                    data_type = "REAL"
                else:
                    data_type = "TEXT"
                c.execute("ALTER TABLE {} ADD COLUMN {} {}".format(table_name, key, data_type))

            conn.commit()
            conn.close()
            print(f"Table '{table_name}' created with columns based on entry data.")

        create_entry(table_name, entry_data)
        print(f"Entry created in table {table_name}")
        socketio.emit('update_data', {'message': 'Data updated'})
    
    elif event_type == "entry.delete":
        id = entry_data['id']
        delete_entry(table_name, id)
        print(f"Entry with {id} deleted from table {table_name}")
        socketio.emit('update_data', {'message': 'Data updated'})
    
    elif event_type == "entry.update":
        id = entry_data['id']
        update_entry(table_name, id, entry_data)
        print(f"data updated for id {id} in table {table_name}")
        socketio.emit('update_data', {'message': 'Data updated'})
    
    else:
        print(f"Unsupported event type {event_type}")

    print(data)
    return 'OK'


@socketio.on('connect')
def handle_connect():
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if __name__ == "__main__":
    if not os.path.exists('BikeImages'):
        os.makedirs('BikeImages')
    socketio.run(app, debug=True)
