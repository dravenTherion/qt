window.QT = (function(){
    
    const _this           = {},
        
          _MAX_CHILDREN   = 10,
          _MAX_LEVEL      = 5,
        
          _TOP_LEFT       = 0,
          _TOP_RIGHT      = 1,
          _BOTTOM_LEFT    = 2,
          _BOTTOM_RIGHT   = 3;
    
    
    // Quadtree Node base tructure
    function Node( level, bounds ){
        
        this.parent     = null;
        this.level      = level,
        this.bounds     = bounds,
        this.nodes      = [],
        this.children   = [];

    }
    
    
    // Clear all nodes and children
    Node.prototype.clear   = function(){

        let length  = this.nodes.length;
        
        // Clear this node's children
        this.children       =   [];
        
        // Recurse through subnodes and clear their child nodes
        for( let ctr = 0; ctr < length; ctr++ )
        {
            if( this.nodes[ ctr ] )
            {
                let tmpNode     = this.nodes[ ctr ];
                tmpNode.clear();
                
                tmpNode     = null;
            }
        }
            
        // Destroy this node's subnodes
        this.nodes          = [];

    }
        
    
    // Split this node into quadrants    
    Node.prototype.split  = function(){
        
        // get the dimensions for this nodes quadrants 
        let quadWidth   = this.bounds.width / 2,
            quadHeight  = this.bounds.height / 2,
            
            x           = this.bounds.x,
            y           = this.bounds.y;
            
        this.nodes[0]   = new Node( this.level + 1, new Geom.box( x, y, quadWidth, quadHeight ) );                             // TOP LEFT quadrant
        this.nodes[1]   = new Node( this.level + 1, new Geom.box( x + quadWidth, y, quadWidth, quadHeight ) );                 // TOP RIGHT quadrant
        this.nodes[2]   = new Node( this.level + 1, new Geom.box( x, y + quadHeight, quadWidth, quadHeight ) );                // BOTTOM LEFT quadrant
        this.nodes[3]   = new Node( this.level + 1, new Geom.box( x + quadWidth, y + quadHeight, quadWidth, quadHeight ) );    // BOTTOM RIGHT quadrant
        
        this.nodes[0].parent = this;
        this.nodes[1].parent = this;
        this.nodes[2].parent = this;
        this.nodes[3].parent = this;
            
    }
        
    
    // Get the quadrant where the rectangle belongs to
    Node.prototype.getQuadrant = function( rectangle ){
            
        let quadrants = [],                
            
            // get this node's midpoints
            midpointHorizontal  = this.bounds.x + this.bounds.width / 2,
            midpointVertical    = this.bounds.y + this.bounds.height / 2,
            
            // flags which quadrant of the node the rectangle overlaps
            left                = rectangle.x < midpointHorizontal || rectangle.x + rectangle.width < midpointHorizontal ? true : false,
            right               = rectangle.x > midpointHorizontal || rectangle.x + rectangle.width > midpointHorizontal ? true : false,
            
            top                 = rectangle.y < midpointVertical || rectangle.y + rectangle.height < midpointVertical ? true : false,
            bottom              = rectangle.y > midpointVertical || rectangle.y + rectangle.height > midpointVertical ? true : false;
        
        
        // locates which quadrant the rectangle is in
        if( left )
        {
            if( top )
                quadrants.push( _TOP_LEFT );
            
            if( bottom )
                quadrants.push( _BOTTOM_LEFT );
        }
        
        if( right )
        {
            if( top )
                quadrants.push( _TOP_RIGHT );
            
            if( bottom )
                quadrants.push( _BOTTOM_RIGHT );
        }
            
        return quadrants;
            
    }
        
    
    // Insert the rectangle into the node
    Node.prototype.insert = function( rectangle ){

        
        // if the the node aleady has existing subnodes
        // get the rectangle's corresponding quadrant (subnode) and insert it there. 
        if( this.nodes.length )
        {
                
            let quadrants    = this.getQuadrant( rectangle );
                
            
            for(let ctr = 0; ctr < quadrants.length; ctr++ )
                this.nodes[ quadrants[ ctr ] ].insert( rectangle );
            
            return;
            
        }
            
        this.children.push( rectangle );
            
        
        // if the node has reached the maximum children allowed and
        // and has not reached the maximum level, split it into quadrants
        // and redistribute this node's children into the newly created subnodes
        if( this.children.length > _MAX_CHILDREN && this.level < _MAX_LEVEL )
        {
                
            if( !this.nodes.length )
                this.split();
                
            let length  = this.children.length;
            
            for(let ctr = 0; ctr < length; ctr++ )
                this.insert( this.children[ ctr ] );
                
            this.children = [];
            
        }
            
    }
    
    // Recurse through all the possible nodes the rectangle is located in and 
    // retrieve all elements ( children ) that it can collide with
    Node.prototype.retrieve = function( returnList, rectangle ){
        
        if( this.nodes.length )
        {
            let quadrants    = this.getQuadrant( rectangle );
            
            for(let ctr = 0; ctr < quadrants.length; ctr++ )
                this.nodes[ quadrants[ ctr ] ].retrieve( returnList, rectangle );
        }
        
        returnList.push.apply( returnList, this.children );
        
    }
    
    
    // Deletes a specific rectangle from the tree
    Node.prototype.delete = function( rectangle ){
        
        if( this.nodes.length )
        {
            let quadrants = this.getQuadrant( rectangle );
            
            for(let ctr = 0; ctr < quadrants.length; ctr++ )
                this.nodes[ quadrants[ ctr ] ].delete( rectangle );             
        }
        else
        {
            var parent;
            
            for(let ctr = 0; ctr < this.children.length; ctr++ )
            {                
                if( rectangle == this.children[ ctr ] )
                {
                    parent = this.parent;
                    
                    this.children[ ctr ] = null;
                    this.children.splice( ctr, 1 );
                    
                    if( parent )
                        if( 
                            !parent.nodes[ 0 ].children.length && 
                            !parent.nodes[ 1 ].children.length && 
                            !parent.nodes[ 2 ].children.length && 
                            !parent.nodes[ 3 ].children.length 
                        )
                        {
                            parent.clear();
                        }
                    
                    break;
                }
            }
        }
    }
    
    
    Object.defineProperties( 
            
        _this, 
        
        {
            // getter/setter for the maximum children
            'maxChildren' : {

                get: function(){
                    
                    return _MAX_CHILDREN;
                    
                },

                set: function( newMaxChildren ){
                    
                    _MAX_CHILDREN   = newMaxChildren;
                    
                }

            },
            
            // getter/setter for the maximum level
            'maxLevel' : {

                get: function(){
                    
                    return _MAX_LEVEL;
                    
                },

                set: function( newMaxLevel ){
                    
                    _MAX_LEVEL   = newMaxLevel;
                    
                }

            }
            
        }
        
    );
    
    _this.node          = Node;
    
    return _this;

})();