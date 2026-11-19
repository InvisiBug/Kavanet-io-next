![video](./vid.mp4)

## Overview
The LED club project was a group effort between 6 people who were kinda looking for an excuse to work on something together.
These led clubs were made to be part of the set decoration for the EJC Fire Gala in Ovar in 2024.
The idea was to attach them to the back wall of the stage and have them display different patterns in a sequence aligned with the music for the performance.

The clubs were made from some thin laser cut mdf with a pattern made by one of the team. 2 LED strips were stuck to a 3d printed lip that ran around the backside of each club, one strip pointing inwards and the other pointing outwards. The LEDs were controlled by an ESP32 micro controller and powered by a usb battery bank.

The clubs were programmed with [WLED](https://kno.wled.ge/) which is pretty much the best LED software for micro controllers. It has loads of built in effects and can connect to each other via WiFi and be synced together. They can also receive a signal via [art-net](https://art-net.org.uk/), which is what most stage lighting control software uses.

We used [xLights](https://xlights.org/) to coordinate the lights, which was originally made for people to control insane christmas light shows. It made syncing the club effects to music super easy and came with its own effects to choose from.

The whole system works really well and the clubs look really impressive. They've been used at loads of events and my friend who organised the whole thing has them set up in their house and uses them as ambient lights, controlled by WLED.


## The Clubs
### The Hardware
The clubs were made from three mm MDF which had been laser cut with the patterns and a 3-D printed sort of wall that ran around the underside with the LEDs stuck to it pointing in and out.

They were attached to the building using anchors and some thread attached to the top and bottom which allowed us to angle them in any orientation we wanted.

The LEDs were wired to an ESP32 micro controller which was taped inside a bag to make it rainproof. A usb cable ran to a power bank which was perched on the building as close to the club as possible

### The Software
We were originally planning on using Touch designer to control the clubs, but we quickly realized it had a steep learning curve, so instead, found a project, called [xLights](https://xlights.org/), made by people who wanted to make some crazy christmas light decorations for their house and sync everything to music, pretty much exactly what we were trying to do minus the Christmas part.

I have since put a lot of time into TouchDesigner and used it for the LED space at BJC 2026. [You can read more about that here](http://localhost:5173/community/bjc-2026-led-space).

xLights allowed us to view the waveform of a song on a timeline and assign effects to each club separately on the same timeline, syncing everything up.
We used the laptop running xLights to control the music during the show.

### Final Thoughts
Overall the clubs work really well, there are a few changes I'd like to make like swapping the wires out for some of a thinner gauge and make a container for the electronics.
