from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import sklearn 
from sklearn.cluster import AgglomerativeClustering 
from sklearn.decomposition import PCA
from pandas import pandas
import pandas as pd
import math 
import numpy as np
from copy import deepcopy

app = Flask(__name__)
CORS(app)

@app.route('/backendscript', methods=['GET','POST'])
@cross_origin()

def get_value():
    data = request.json
    print("hello world")
    print(data)
    d = data.send_data[0]
    # d = deepcopy(data[0])
    if len(data) >2:
        filter = deepcopy(data[2])
    if not data[0]:
         return jsonify({"PCAdata": []})
    pca = PCA()
    total_T =list()
    total_rho =list()
    total_d =list()
    d_filtered = []

    if len(data) >2:
       filters = map(lambda e :e['id'], filter)
       filters = list(filters)
       for i, el in enumerate(d):
           if el['id'] in filters:
               d_filtered.append(el)
       return {"PCAdata": d_filtered}




    for i,el in enumerate(d):
        el2 =  el['output-parameters']
        if len(data[1]) == 0:
            total_T.append(el2["T_lag_avg"])
            total_rho.append(el2["rho_lag_avg"])
            total_d.append(el2["d_lag_avg"])
        else:
            if 'T_lag_avg' in data[1]:
                total_T.append(el2["T_lag_avg"])
            if 'rho_lag_avg' in data[1]:
                total_rho.append(el2['rho_lag_avg'])
            if 'd_lag_avg' in data[1]:
                total_d.append(el2['d_lag_avg'])



    X = pd.DataFrame()
    if len(data[1]) == 0:
        X['T_lag_avg'] = total_T
        X['rho_lag_avg'] = total_rho
        X['d_lag_avg'] = total_d

    else:
        if len(total_T) > 0:
            X['T_lag_avg'] = total_T
        if len(total_d) > 0:
            X['d_lag_avg'] = total_d
        if len(total_rho) > 0:
           X['rho_lag_avg'] = total_rho
             

    x_pca = pca.fit_transform(X)
    x_pca = pd.DataFrame(X)
    if len(data[1]) == 1:
        x_pca['PC2'] = [0]* len(data[0])

    x_pca = x_pca.iloc[:, list(range(2))]
    x_pca.columns = ['PC1', 'PC2']
    x_pca_pc1 =  x_pca['PC1'].to_numpy()
    if (x_pca_pc1 - x_pca_pc1.mean()).all() != 0:
        x_pca_pc1 = (x_pca_pc1 - x_pca_pc1.mean()) / np.std(x_pca_pc1)
    else:
        x_pca_pc1 = x_pca['PC2']
    if len(data[1]) ==1:
        x_pca_pc2 =  x_pca['PC2']
        
    else: 
        x_pca_pc2 =  x_pca['PC2'].to_numpy()

        if (x_pca_pc2 - x_pca_pc2.mean()).all() != 0:
            x_pca_pc2 = (x_pca_pc2 - x_pca_pc2.mean()) / np.std(x_pca_pc2)
        else:
            x_pca_pc2 = x_pca['PC2']

    
    for i,el in enumerate(d):
        d[i]['x']= float(x_pca_pc1[i])
        d[i]['y']= float(x_pca_pc2[i])




    return jsonify({"PCAdata": d})

if __name__ == '__main__':
    app.debug = True
    app.run(port=3000)