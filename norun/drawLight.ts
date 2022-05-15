/*



From central point.
shoot rays to find boundry (maybe not needed)

shoot a cirular hitbox at attemped draw radius

check to see if WALL item overlaps circle.
    if false 
        draw complete CIRCLE at light point at the specific radius

    if true 
        cast rays to find most left and right point of WALL or WALLS
        draw ARC around light point from start/end of raycast points. 
            repeat ARC for any other points in detected array



DRAW:

    Each circle or arc is a additive BLEND that also colour mixes. (check to see if possible.)
    If not possible, check to see if circles and arcs can find a central meeting point. 


















*/