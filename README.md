# QT

A Quadtree implementation using JavaScript

Check out the demo [here](https://codepen.io/draventherion/pen/MWYOmpj)
 

___
## Getting Started

Clone this [repository](https://github.com/dravenTherion/qt.git) or download it as a [zip file](https://github.com/dravenTherion/qt/archive/master.zip).


___
### Installation

```
<script src="source/geom.js"></script>
<script src="source/collision.js"></script>
<script src="source/qt.js"></script>
```

## Modules

### GEOM
 
The *Geom* module allows the creation of new geoms (point, box and circ).

The module also contains helpers to calculate the distance between points, the angle of a vector 
and split a vector into X and Y components.

___

**point(x, y)**  
_create a new point_

```javascript
let point = new Geom.point(0 , 0);

//point.x is 0;
//point.y is 0;

```


**box(x, y, width, height)**  
_create a new box_

```javascript
let box = new Geom.box(0 , 0, 50, 25);

//box.x = 0;
//box.y = 0;
//box.width = 50;
//box.height = 25;
```


**circ(x, y, radius)**  
_create a new circle_

```javascript
let circle = new Geom.circ(0 , 0, 25);

//circle.x = 0;
//circle.y = 0;
//circle.radius = 25;
//circle.width = 50;
//circle.height = 50;
```


**dist2Points(x1, y1, x2, y2)**  
_calculate distance between two points_

```javascript
let distance = Geom.dist2Points(0, 0, 10, 10);

//distance = 14.142135623730951
```


**angle(xLen, yLen)**  
_calculates the angle (degrees) of a vector_

```javascript
let pt1 = {x: 0, y: 0},
    pt2 = {x: 10, y: 10;

let xLen = pt2.x - pt1.x;
let yLen = pt2.y - pt1.y;

let angle = Geom.angle(xLen, yLen);

//angle = 45
```


**vector(magnitude, angle)**  
_breaks a vector into X and Y components_

```javascript
let vector = Geom.vector(14.142135623730951, 45);

//vector.x = 10;
// vector.y = 10;
```

___
### QT

The *QT* module allows the creation of quadtrees for spatial partitioning.

This module contains methods to insert or delete a rectangle from a tree and retrieve 
a list of possible objects it can collide with.


___
 
#### PROPERTIES

**maxChildren**  
_the maximum objects a node can contain before splitting_

```
quadTree.maxChildren  = 15;
```


**maxLevel**  
_the maximum number of times that a node can be split_

```
quadTree.maxLevel   = 15;
```
 
#### METHODS 


**node(level, bounds)**  
_creates a new quadtree node_

```javascript
const bounds = new Geom.box(0 , 0, 100, 100);
const quadTree = new QT.node(0, bounds);
```


**clear()**  
_clears all child nodes_

```javascript
quadTree.clear();
```


**split()**  
_split current node into quadrants_

```javascript
quadTree.split();
```


**getQuadrant(rectangle)**  
_get quadrant containing the rectangle in the current node_

```javascript
let rec = new Geom.box(0, 0, 25, 25);

quadTree.getQuadrant(rec);
```


**insert(rectangle)**  
_insert a rectangle into the node (can be a Geom.box or Geom.circ)_

```javascript
let rec = new Geom.box(0, 0, 25, 25);

quadTree.insert(rec);
```


**retrieve(returnList, rectangle)**  
_retrieves all possible objects that the rectangle can collide with_
_and stores them in the returnList_

```javascript
let rec = new Geom.box(0, 0, 25, 25);
let colliderList = [];

quadTree.retrieve(colliderList, rec);
```


**delete(rectangle)**  
_deletes a rectangle from the quadtree_

```javascript
quadTree.delete(rectangle);
```
 
 
___
### COLLISION


The *Collision* module contains methods for testing rectangular or circular collision.


**testRect(rec1, rec2)**  
_creates a new quadtree node_

```javascript
let rect1 = new Geom.box(0, 0, 50, 25);
let rect2 = new Geom.box(5, 10, 50, 25);

let result = Collision.testRect(rect1, rect2);

//result = true;
```


**testCirc(circ1, circ2)**  
_creates a new quadtree node_

```javascript
let circ1 = new Geom.circ(0, 0, 25);
let circ2 = new Geom.circ(5, 10, 25);

let result = Collision.testCirc(circ1, circ2);

//result = true;
```


___
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
  
  
___
## Helpful Resources

* https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
* http://buildnewgames.com/broad-phase-collision-detection/
* http://devmag.org.za/2009/04/13/basic-collision-detection-in-2d-part-1/