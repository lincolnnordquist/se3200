import sqlite3

def dict_factory(cursor,row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]
    return result_dict

class InventoryDB:
    def __init__(self,filename):
        # connect to db file
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def getTickets(self):
        self.cursor.execute("SELECT * FROM inventory")
        tickets = self.cursor.fetchall()
        return tickets
    
    def getTicket(self, ticket_id):
        data = [ticket_id]
        self.cursor.execute("SELECT * FROM inventory WHERE id = ?", data)
        ticket = self.cursor.fetchone()
        return ticket
    
    def createTicket(self, entrant_name, entrant_age, guest_name, random_token):
        self.cursor.execute("INSERT INTO inventory (entrant_name, entrant_age, guest_name, random_token) VALUES(?, ?, ?, ?)", (entrant_name, entrant_age, guest_name, random_token))
        self.connection.commit()