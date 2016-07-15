import sqlite3
conn=sqlite3.connect('database.db', check_same_thread=False)


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn.row_factory = dict_factory

conn.execute('''CREATE TABLE if not exists patient
(pat_id INTEGER PRIMARY KEY AUTOINCREMENT,
pat_first_name TEXT NOT NULL,
pat_last_name TEXT NOT NULL,
pat_insurance_no TEXT NOT NULL,
pat_ph_no TEXT NOT NULL,
pat_address TEXT NOT NULL);''')

conn.execute('''CREATE TABLE if not exists doctor
(doc_id INTEGER PRIMARY KEY AUTOINCREMENT,
doc_first_name TEXT NOT NULL,
doc_last_name TEXT NOT NULL,
doc_ph_no TEXT NOT NULL,
doc_address TEXT NOT NULL);''')

conn.execute('''CREATE TABLE if not exists patient_doctor
(pat_id INTEGER NOT NULL,
doc_id INTEGER NOT NULL,
appointment_date DATE DEFAULT (datetime('now','localtime')),
FOREIGN KEY(pat_id) REFERENCES patient(pat_id),
FOREIGN KEY(doc_id) REFERENCES doctor(doc_id));''')