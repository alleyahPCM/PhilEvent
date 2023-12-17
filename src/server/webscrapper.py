import requests
import re
from bs4 import BeautifulSoup
import mysql.connector
from datetime import datetime
import hashlib

host = "localhost"
user = "root"
password = ""
database = "philevent"

def store():
    cities = ["cebu", "manila", "davao"]

    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        if connection.is_connected():
            print("PY: Connected to the database")
            cursor = connection.cursor()
            for c in cities:
                url = f"https://allevents.in/{c}/all?ref=new-cityhome-popular"
                response = requests.get(url)
                soup = BeautifulSoup(response.text, 'lxml')

                events = soup.find_all('li', class_='item event-item box-link')
                for event in events:
                    name = event.find('h3').text.strip()
                    ven = event.find('span', class_='up-venue toh').text.strip()
                    price = event.find('span', class_='tick-price')
                    if price:
                        price = price.text.strip()
                    else:
                        price = "Free"
                    
                    link = event['data-link']

                    response2 = requests.get(link)
                    soup2 = BeautifulSoup(response2.text, 'lxml')
                    result = soup2.find('span', style="padding: 0").text.strip()
                    dt = re.sub(r'\(GMT\+\d{2}:\d{2}\)', '', result)

                    date = dt.split(" at ")[0]
                    time = dt.split(" at ")[1].split(" to ")[0]
                    desc = soup2.find('div', class_="event-description-html").text.strip()
                    img = soup2.find('img', class_="event-banner-image hidden-phone lazy")['src']
                    date_object = datetime.strptime(date, "%a %b %d %Y")
                    date = date_object.strftime("%Y-%m-%d")
                    time_object = datetime.strptime(time, "%I:%M %p")
                    time = time_object.strftime("%H:%M:%S")

                    result_string = f"{name},{date},{time}"
                    hash = hashlib.sha256(result_string.encode()).hexdigest()
                    data = (name,c,ven,date,time,price,desc,link,img,hash)
                    insert_query = "INSERT IGNORE INTO events (title, city, address, date, time, ticket_price, description, link, image, hash) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    cursor.execute(insert_query, data)
                    connection.commit()
                    # print("Upcoming event added successfully")
                    

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()
            print("Connection closed")

def delete():
    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        if connection.is_connected():
            cursor = connection.cursor()
            curr = datetime.now().strftime('%Y-%m-%d')
            cursor.execute(f"DELETE FROM events WHERE date <= \'{curr}\'")
            connection.commit()
                    

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()
            print("Connection closed")

store()
delete()