// cretae a graph class
class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
        this.AdjMatrix = [];
        for (var i = 0; i < noOfVertices; i++) {
            this.AdjMatrix[i] = [];
            for (var j = 0; j < noOfVertices; j++) {
                this.AdjMatrix[i][j] = 0;
            }
        }
    }

    // add edge to the graph
    addEdge(v, w, u) {
        // get the list for vertex v and put the
        // vertex w denoting edge betweeen v and w
        //this.AdjList.get(v).push(w);

        // Since graph is undirected,
        // add an edge from w to w also
        //this.AdjList.get(w).push(v);

        this.AdjMatrix[v][w] = u;
        this.AdjMatrix[w][v] = u;

    }

    getVertices() {
        var nodes = [];

        for (var v in this.AdjMatrix) {
            nodes.push({
                id: v,
                label: String(v)
            });
        }

        return nodes;
    }

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

    getMSTEdges(parent) {
        var edges = [];

        for (var i = 1; i < this.noOfVertices; i++)
            edges.push({
                from: parent[i],
                to: i,
                label: String(this.AdjMatrix[i][parent[i]])
            });

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

    // A utility function to print the constructed MST stored in
    // parent[]
    printMST(parent, graph) {
        console.log("Edge   Weight");
        for (var i = 1; i < this.noOfVertices; i++)
            console.log(parent[i] + " - " + i + "    " + graph[i][parent[i]]);
    }

    // Function to construct and print MST for a graph represented
    //  using adjacency matrix representation
    primMST(graph) {
        // Array to store constructed MST
        var parent = [];

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
        key[0] = 0;     // Make key 0 so that this vertex is
        // picked as first vertex
        parent[0] = -1; // First node is always root of MST

        // The MST will have V vertices
        for (var count = 0; count < this.noOfVertices - 1; count++) {
            // Pick thd minimum key vertex from the set of vertices
            // not yet included in MST
            var u = this.minKey(key, mstSet);

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
        this.printMST(parent, graph);
        return parent;
    }
}
