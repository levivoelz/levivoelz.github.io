#-----------------------------------------------------------------------------
# polar_zonohedron v 1.0
# Copyright 2010, Rob Bell
# author: Rob Bell
#
# Permission to use, copy, modify, and distribute this software for 
# any purpose and without fee is hereby granted, provided the above
# copyright notice appear in all copies
#
# THIS SOFTWARE IS PROVIDED "AS IS" AND WITHOUT ANY EXPRESS OR
# IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
#-----------------------------------------------------------------------------


require "sketchup.rb"

include Math


class Sketchup::Group

  attr_accessor :frequency, :pitch, :length
  attr_accessor :zome
  
  def copy
  
    puts "copy"
  
  end
  
  
  def render_zome
  
    @zome = Zome.new
    @zome.init( @frequency, @pitch, @length )
  #  z.polar_zonohedron
    @zome.calculate_polar_zonohedron
    @zome.make( self.transformation )
    self.visible=false
  
  end
  
  
 # @frequency = 8
  
  #def frequency
  #  @frequency
  #end
 # def frequency= f
 #   @frequency= f
 # end
  
  

end

def polar_zonohedron #frequency, pitch = atan(sqrt(2)/2), len = 1.0 # frequency,pitch,length

  $exStrings = LanguageHandler.new("Examples.strings") 
  
  mo = Sketchup.active_model
  mo.start_operation "polar_zonohedron"
  
  
    prompts = ["Frequency", "Pitch in radians", "Length"]
    values = [8, "atan( sqrt(2)/2 )", 12.inch]
    results = inputbox prompts, values, "Polar Zonohedron"
    
    return if not results # This means that the user canceld the operation
    
    
    
  ents = mo.active_entities
  grp = ents.add_group
  ents = grp.entities
  
    grp.frequency = results[0]
    grp.pitch = eval( results[1] )
    grp.length = results[2]
    
   
  pts=[]
  
  #we begin by setting pts[0] to the origin
  pts[0] = Geom::Point3d.new(0,0,0)
    
  vector = Geom::Vector3d.new(cos(grp.pitch),0,sin(grp.pitch) ) #tilt pitch vector up the xz plane
  vector.length = grp.length
    
  #Using the origin as the initial generator we iterate thru each zone of the zonohedron
  #our first task is to define the four points of the base rhomb for this zone
  #at the end the pts[3] becomes our new origin for the rhomb of the next zone
  1.upto(grp.frequency-1){ |i| 
      p_rotate = Geom::Transformation.rotation( pts[0] , Geom::Vector3d.new(0,0,1), i*2*PI/grp.frequency )
      
      #obtain the other three points of the rhomb face
      pts[1] = pts[0].transform vector
      pts[3] = pts[1].transform( p_rotate )
      pts[2] = pts[3].transform( vector )
      
      #we now have the 4 points which make this zone's base rhomb
      #so we rotate around the origin frequency times making a star pattern of faces
      0.upto(grp.frequency-1){ |j| 
        f_rotate = Geom::Transformation.rotation( Geom::Point3d.new(0,0,0) , Geom::Vector3d.new(0,0,1), j*2*PI/grp.frequency )     
        ents.add_face( pts.collect{|p| p.transform(f_rotate)} )
      }

      #set the origin for the rhomb of the next zone
      pts[0] = pts[3]
  
  }
  
  
  mo.commit_operation
end



   
if( not file_loaded?("polar_zonohedron.rb") )
    add_separator_to_menu("Plugins")
    UI.menu("Plugins").add_item("Polar Zonohedron") { polar_zonohedron }
end
#-----------------------------------------------------------------------------
file_loaded("polar_zonohedron.rb")


