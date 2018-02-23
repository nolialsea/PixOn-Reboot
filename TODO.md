# TODO

### Archives
- [x] Save image on server
- [x] Load last image at server start
- [x] Archive server image every X pixel
- [x] Timelapse visualisation
- [ ] Refactor archive storage format to reduce memory size
- [ ] Automatic appending of new archives into img list
- [ ] Reverse timelapse
- [ ] Refine archives UI
- [ ] Visualise archive from precise date

### Tools
- [x] Mouse wheel zooming
- [ ] Pipette
- [ ] Flood fill (bucket tool)
- [ ] Resizable brush

### Mobile UX
- [ ] Tool selection
- [ ] Zoom and pan with multi-touch

### Fixes
- [x] Send server config to client
- [x] Avoid drawing two times the same pixel
- [x] Prevent picking a color to draw pixels

### Palettes
- [x] Redo palette system
- [x] DB32
- [x] ENDESGA32
- [x] ARNE32
- [x] GAMEBOY4
- [x] TWO_BIT_GRAYSCALE
- [x] AAP64
- [x] ARCADE_STANDARD29
- [x] CGA_2_HIGH
- [x] CGA
- [x] COMODORE64
- [x] DAWNBRINGER32
- [x] DB_ISO22
- [x] GAMEBOY_CHOCOLATE
- [x] GNOME32
- [x] GRAFXKID_GAMEBOY_POCKET_GRAY
- [x] KIROKAZ_GAMEBOY
- [x] LINEAR_COLOR_BASIC
- [x] LINKS_AWAKENING_SGB
- [x] MATRIAX8C
- [x] MEGAMAN_V_SGB
- [x] MICROSOFT_WINDOWS
- [x] MSX
- [x] NINTENDO_ENTERTAINMENT_SYSTEM
- [x] NINTENDO_GAMEBOY_BGB
- [x] NINTENDO_SUPER_GAMEBOY
- [x] OPTIMUM
- [x] PICO8
- [x] POKEMON_SGB
- [x] STARMANCER
- [x] PRIO
- [x] PICO

## Long term ideas

#### Room system
- In addition to the main public room (which is the one already implemented), players will be allowed to create and join rooms with specific size, palettes and other configurable properties
 
#### Public and private rooms
- Public rooms are open for everybody without login and can be accessed via `localhost:port/room_name`
- Private rooms require to login to the website to create and join them. 

#### Tiled rooms
- Each player can only draw onto his assigned tile
- Players can switch to an empty tile with a configurable cooldown
- Rectangular or Isometric tiles

#### World map
- An isometric main public room where each player has his own private persistent tile

#### Room events
- Rooms can have random periodic events (some of them require to reset the room) :
	- New resolution randomly selected among predefined ones (need reset)
	- New palette randomly selected among predefined ones (possible reset)
	- Erase random part(s) of the room
	- The room is "processed" in some way by a bot
