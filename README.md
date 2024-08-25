# Sandbox_Web

Just a place to play with web code while learning. <br>

<br>

## To-Do

- [ ] Weather API
  - [ ] Make it pretty
  - [ ] Implement Weather Image
  - [ ] Scan historical shortForecasts for keyword parsing to create icons
- [ ] Shrink the Header on Scroll, then sticky it

## Questions

- [ ] Is there a way to move getlocation into getforecast? instead of location being required to call forcast?
- [ ] async await vs callback?
- [ ] can you await function(callback)?
- [ ] how to mix await functionAsync and functionCallBack patterns?
- [ ] Group functions and multiple script files together? Bundle Them?
- [ ] Is there a way to use HTML in #element::before { content: "some content" }
- [ ] How do I add accessibility to a weather widget with a tooltip popup for the forecast?
- [ ] Help with fetch caching and syntax
- [ ] Is there a way to lockout an async function so that it isn't called twice at the same time from different sources? The Weather task is linked to the widget in the header and an on-demand button. If both were called simultaneously bad things would probably result.
- [ ] I'm probably using to many divs. How can I Improve this?

## Notes

- Container-Type: interacts with grid and flex sizes and alignments. How do I correct or adjust for this?
- Is it possible to combine multiple different containers into a query?
- Is there a way to re-write the container query to apply the display-type? changes to self or sibling? I would rather read self-width instead of parent-width-adjusted-for-margins.
- Alternatively Use an Invisible \<div> parent? But you would still need to adjust for the interactions issue noted above.

## Blog

### 24/08/24

- Added GridBox Demo to play with, learn, and debug a GridBox issue.

### 24/08/22

- Added cache timer feedback, placeholder image, and worked on researching some cloud computing options like AWS Lambda

### 24/08/21

- Refactored GetWeatherLocation to use cache first, instead of second. Could likely cleanup all the logic at this point.
- More work with the weather api and weather widget.
  - Added a primitive weather hover/tool-tip. But this really needs looking at, how best to implement it, how to play nice with the nav, etc.

### 24/08/20

- Wired up the NWS API and Data caching. Now we have to make it pretty, create or find icons, format it, etc.

### 24/08/19

- Experimented more with the NWS API. Integraged Geolocation and Forecast. Started Adding Local Storage and Caching.

### 24/08/17

- Experimented with the OpenWeather API. It's easier for current weather, but isn't going to supply the forecast and information I really want as well as the NWS API. I might go ahead and use it for current weather, just for convenience, might not.

### 24/08/16

- Playing with the NOAA NWS Weather API
  - I can definitely see why people opt for the paid APIs.

### 24/08/15

- More Playing with Animations and Sprites.
- Modular Double-Div Animations, that could in the future be controlled by JavaScript.
  - It's more difficult to repeat modular or grouped animations in pure CSS as there is neither grouping nor delay-after options.
    - You can add a delay after using keyframes, but then the animations become non-modular, and I was purposefully looking at modular design.

### 24/08/14

- Playing with Animations

### 24/08/13

- We finally have the averaging function I wanted.
- container-type: interacts with grid and flex sizes and alignments.
- Added a lot of notes about Math, Container Queries, Container Math, etc.

  ```
  /* ========================================================================
    Mathemanai
      * You can do container math without the container query, but it targets
          the parent, aka container of the current element.
      * Firefox is more durable than for CSS Math Failures.  Chrome tends to crash, firefox just returns null, zero, or nulls ALL your math.
      * ANY error in the final compiled forumla will cause the entire
          formula to fail, including all 'previous' steps.
      * Can NOT mix units in the same formula.
      * Can Convert to numeric with tan(atan2(X Units, 1 Unit));
      * can NOT divide Units by Units, only numbers.
          100px / 2px = fail? 100px / 2 = 50px
      * variables are WORM Cascade, Write Once Read Many and Cascade, and
          variables can not reference themselves, and they are redefined by
          by the last definition found in the file. Variables are not
          really WORM. More accurately it's probably:
            Read the File, Define the Variables, Assign the Variables,
            Read the file again and execute the definitions.
      * WORM
        --pixie: 1500;
        --pixies: calc(var(--pixie) / 3);
        --pixie: 1000;
        var(--pixies) now equals 333;
      * counter may be limited in precision

    Container Queries
      * container-type: interacts with grid and flex sizes and alignments
      * parent container query CAN control display: for children
      * container can NOT control display: for self
      * sibling can NO control display: for siblings
      * cqw: width - borders and padding and adjusted for dpi
      * vw: viewport width

  */
  ```

### 24/08/08

- We have **Container Queries**!
- Container Query by Name and Type.
- Protozoan Math and Type Casting in CSS
  - there are some noted support issues. Support is supposedly inbound, but not there yet.
- How to inspect a CSS variables value?
  - The answer appears to be that you can not.
  - You can apply the value and inspect the result, but I'm not sure how useful this will be for math stuff?
  - You can inspect the value and get the computed formula, but not the result
  - You can use content and counter(), but precision is abysmal, it breaks on 12003 but not 1203 ... so what is the limit? 8k? 2k?
  - counter/reset is limited to one use per block, but you can set/reset multiple counters in that one line.
- Image alignment wonkiness best practices? I used margins and EMs and eyeballs.

### 24/07/20

- Notes

  ```
  /* this is what makes it fill the viewport */
  /* this was ommitted from the discussion and demos */
  html,
  body {
  height: 100%;
  margin: 0;
  }
  ```

  ```
  /* align-content, justify-content, flex-grow; all interact. */
  /* content automatically grows perpendicular, toggle grow for parralel */
  /* toggle grow if you want to modify the justify/align parralel */
  /* align-content: space-around; */
  /* justify-content: space-around; */
  ```
