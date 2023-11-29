import random

colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#e67e22', '#9b59b6', '#e91e63', '#00bcd4', '#95a5a6', '#795548']
asignColor = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

def asignar_color(sid):
    # Filtra los diccionarios vacíos
    diccionarios_vacios = [i for i, dic in enumerate(asignColor) if not dic]
    
    if diccionarios_vacios:
        # Asigna a un diccionario vacío de manera aleatoria
        indice_diccionario = random.choice(diccionarios_vacios)
        asignColor[indice_diccionario][sid] = random.choice(colors)
    else:
        # Todos los diccionarios están ocupados, asigna al que tiene menos elementos
        indice_diccionario = min(range(len(asignColor)), key=lambda i: len(asignColor[i]))
        asignColor[indice_diccionario][sid] = random.choice(colors)

def obtener_color(sid):
    # Busca el SID en todos los diccionarios y devuelve el color asociado
    for dic in asignColor:
        if sid in dic:
            return dic[sid]
    return None

def borrar_sid(sid):
    # Elimina el SID de todos los diccionarios donde esté presente
    for dic in asignColor:
        if sid in dic:
            del dic[sid]
