# Sandbox_Web

Just a place to play with web code while learning. <br>

<br>

## Blog

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
- Image alignment wonkiness best practices?  I used margins and EMs and eyeballs.

### 24/07/20

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
