// Queue class
class Queue {
    // Array is used to implement a Queue
    constructor() {
        this.items = [];
    }

    // enqueue function
    enqueue(element) {
        // adding element to the queue
        this.items.push(element);
    }

    // dequeue function
    dequeue() {
        // removing element from the queue
        // returns underflow when called 
        // on empty queue
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // front function
    front() {
        // returns the Front element of 
        // the queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    // printQueue function
    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

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

    // add vertex to the graph
    addVertex(v) {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
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

    // Prints the vertex and adjacency list
    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    // function to performs BFS
    bfs(startingNode) {

        // create a visited array
        var visited = [];
        for (var i = 0; i < this.noOfVertices; i++)
            visited[i] = false;

        // Create an object for queue
        var q = new Queue();

        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);

        // loop until queue is element
        while (!q.isEmpty()) {
            // get the element from the queue
            var getQueueElement = q.dequeue();

            // passing the current vertex to callback funtion
            console.log(getQueueElement);

            // get the adjacent list for current vertex
            var get_List = this.AdjList.get(getQueueElement);

            // loop through the list and add the elemnet to the
            // queue if it is not processed yet
            for (var i in get_List) {
                var neigh = get_List[i];

                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
        }
    }

    // main dfs method
    dfs(startingNode) {

        var visited = [];
        for (var i = 0; i < this.noOfVertices; i++)
            visited[i] = false;

        this.DFSUtil(startingNode, visited);
    }

    // Recursive function which process and explore
    // all the adjacent vertex of the vertex with which it is called
    DFSUtil(vert, visited) {
        visited[vert] = true;
        console.log(vert);

        var get_neighbours = this.AdjList.get(vert);

        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i];
            if (!visited[get_elem])
                this.DFSUtil(get_elem, visited);
        }
    }

    listToMatrix() {

        var get_keys = this.AdjList.keys();

        var arr = {};
        for (var i of get_keys) {
            var get_values = this.AdjList.get(i);
            arr[i] = {};
            for (var j of get_values) {
                arr[i][j] = 1;
            }
        }

        return arr;

        /*
                var ver = ['A', 'B', 'C', 'D', 'E', 'F'];
                var value = [1, 2, 3, 4, 5];
        
                var arr = {};
                for (var v in ver) {
                    arr[ver[v]] = {};
                    arr[ver[v]][ver[v]] = value[v];
                }
        
                console.log(arr['A']['A']);
        
                var get_keys = this.AdjList.keys();
        
                // iterate over the vertices
                for (var i of get_keys) {
                    // great the corresponding adjacency list
                    // for the vertex
                    var get_values = this.AdjList.get(i);
                    //var conc = "";
        
                    // iterate over the adjacency list
                    // concatenate the values into a string
                    for (var j of get_values)
                        edges.push({
                            from: i,
                            to: j
                        });
                }
        
        
        
                for (var j of get_values) { // for(of) bierze elementy
                    var exist = false;
                    for (var k in edges) { // for(in) bierze indeksy
                        if (edges[k]["from"] == j && edges[k]["to"] == i) {
                            exist = true;
                            break;
                        }
                    }
                    if (!exist) {
                        edges.push({
                            from: i,
                            to: j
                        });
                        //}
                    }
                }
                */
    }

    getVertices() {
        var nodes = [];

        for (var v in this.AdjMatrix) {
            nodes.push({
                id: v,
                label: String(v)
            });
        }

        // var nodeCount = this.AdjList.keys();
        // for (var i of nodeCount) {
        //     // for (var i = 0; i < nodeCount; i++) {
        //     nodes.push({
        //         id: i,
        //         label: String(i)
        //     });
        // }

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
