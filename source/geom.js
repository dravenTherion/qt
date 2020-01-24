const Geom = (function(){
    
    const _this   = {};
    
    const _POINT  = 'point',
          _BOX    = 'box',
          _CIRC   = 'circle';
    
    
    _init();
    
    
    // Initializze and set polyfills etc.
    function _init(){
        
                
    }
    
    // Create point geom
    function Point( x, y ){
        
        this.id     = Date.now();
        this.name   = '';
    
        this.x      = x || 0;
        this.y      = y || 0;
        
        this.type = this.baseType   = _POINT;
        
    }
    
    // create box geom
    function Box( x, y, width, height ){
    
        this.width  = width || 0;
        this.height = height || 0;

        Point.call( this, x, y ); 
        
        this.type = this.baseType   = _BOX;
        
    }

    // create circ
    function Circ( x, y, radius ){
        
        this.radius = radius;
        
        Box.call( this, x, y, radius * 2, radius * 2 ); 
        
        this.type = this.baseType   = _CIRC;
        
    }
    
    // Distance between 2 points
    function _dist2Points( x1, y1, x2, y2 )
    {
        
        let x = x2 - x1,
            y = y2 - y1;
        
        return Math.sqrt( x * x + y * y );
        
    }
    
    
    // Get angle
    function _angle( xLen, yLen ){
        
        return Math.atan2( yLen, xLen ) * 180 / Math.PI;
        
    }
    
    
    // get Vectors
    function _vector( magnitude, angle )
    {
        
        let angleRadians = (angle * Math.PI) / 180;
            
        return new Point( magnitude * Math.cos(angleRadians), magnitude * Math.sin(angleRadians) );
        
    }
    
    
    _this.point         = Point;
    _this.box           = Box;
    _this.circ          = Circ;
    
    _this.dist2Points   = _dist2Points;
    _this.angle         = _angle;
    
    _this.vector        = _vector; 
    
    _this.POINT         = _POINT;
    _this.BOX           = _BOX;
    _this.CIRC          = _CIRC;
    
    
    return _this;
    
    
})();

const Point = Geom.point,
      Box = Geom.box,
      Circ = Geom.circ,
      dist2Points = Geom.dist2Points,
      angle = Geom.angle,
      vector = Geom.vector;

export {
        Point,
        Box,
        Circ,
        dist2Points,
        angle,
        vector
        };
/**/
export default Geom;