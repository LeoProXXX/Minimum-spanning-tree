/**
 * Klasa Graph opisująca graf
 */
class Graph {
    /**
     * Konstruktor Klasy Graph
     * @param {Number} noOfVertices Liczba wierzchołków w grafie 
     */
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjMatrix = [];    // Macierz sąsiedztwa
        // Ustawianie macierzy 
        for (var i = 0; i < noOfVertices; i++) {
            this.AdjMatrix[i] = [];
            for (var j = 0; j < noOfVertices; j++) {
                this.AdjMatrix[i][j] = 0;
            }
        }
    }

    /**
     * Metoda dodająca krawędź w grafie
     * @param {Number} u pierwszy wierzchołek krawedzi
     * @param {Number} v drugi wierzchołek krawedzi
     * @param {Number} w waga krawędzi
     */
    addEdge(u, v, w) {
        this.AdjMatrix[u][v] = w;
        this.AdjMatrix[v][u] = w;
    }

    /**
     * Metoda zwracająca tablice wierzchołków w formacie akceptowanym przez Vis.js
     */
    getVertices() {
        var nodes = [];

        for (var i in this.AdjMatrix) {
            var max = 0;
            for (var v of this.AdjMatrix[i]) {
                if (v > max)
                    max = v;
            }
            if (max > 0) {
                nodes.push({
                    id: i,
                    label: String(i)
                });
            }
        }

        return nodes;
    }

    /**
     * Metoda zwracająca tablice krawędzi w formacie akceptowanym przez Vis.js
     */
    getEdges() {
        var edges = [];

        var clone = [];

        for (var i = 0; i < this.AdjMatrix.length; i++) {
            clone[i] = this.AdjMatrix[i].slice();
        }

        for (var v = 0; v < this.noOfVertices; v++) {
            for (var w = 0; w < this.noOfVertices; w++) {
                if (clone[v][w] != 0) {
                    edges.push({
                        from: v,
                        to: w,
                        label: String(clone[v][w])
                    });
                    clone[w][v] = 0;
                }
            }
        }

        return edges;
    }

    /**
     * Metoda zwracająca tablice krawędzi najmniejszego drzewa rozpinającego w formacie akceptowanym przez Vis.js
     * @param {Array} parent tablica zawierająca rodzica danego wierzchołka 
     */
    getMSTEdges(parent) {
        var edges = [];

        for (var i = 0; i < this.noOfVertices; i++)
            if (parent[i] != -1) {
                edges.push({
                    from: parent[i],
                    to: i,
                    label: String(this.AdjMatrix[i][parent[i]])
                });
            }

        return edges
    }

    // A utility function to find the vertex with minimum key
    // value, from the set of vertices not yet included in MST
    minKey(key, mstSet) {
        // Initialize min value
        var min = Number.MAX_SAFE_INTEGER, min_index = -1;

        for (var v = 0; v < this.noOfVertices; v++)
            if (mstSet[v] == false && key[v] < min) {
                min = key[v];
                min_index = v;
            }

        return min_index;
    }

    /**
     * Metoda tworząca MST
     * @param {Array[]} graph macierz sasiedzt 
     * @param {Number} startVertex wierzchołek poczatkowy
     */
    primMST(graph, startVertex) {
        // Array to store constructed MST
        var parent = [];

        for (var p in parent)
            parent[p] = -1;

        // Key values used to pick minimum weight edge in cut
        var key = [];

        // To represent set of vertices not yet included in MST
        var mstSet = [];

        // Initialize all keys as INFINITE
        for (var i = 0; i < this.noOfVertices; i++) {
            key[i] = Number.MAX_SAFE_INTEGER;
            mstSet[i] = false;
        }

        // Always include first 1st vertex in MST.
        key[startVertex] = 0;     // Make key 0 so that this vertex is
        // picked as first vertex
        parent[startVertex] = -1; // First node is always root of MST

        // The MST will have V vertices
        for (var count = 0; count < this.noOfVertices - 1; count++) {
            // Pick thd minimum key vertex from the set of vertices
            // not yet included in MST
            var u = this.minKey(key, mstSet);

            if (u == -1) {
                break;
            }


            // Add the picked vertex to the MST Set
            mstSet[u] = true;

            // Update key value and parent index of the adjacent
            // vertices of the picked vertex. Consider only those
            // vertices which are not yet included in MST
            for (var v = 0; v < this.noOfVertices; v++)

                // graph[u][v] is non zero only for adjacent vertices of m
                // mstSet[v] is false for vertices not yet included in MST
                // Update the key only if graph[u][v] is smaller than key[v]
                if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
        }

        // print the constructed MST
        return parent;
    }
}
