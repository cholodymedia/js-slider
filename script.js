let slide_position = {
  // place slide at page start
  pos: 0,
  slider: function slide_pos() {
    slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = 'translate3d(' + this.pos + '%,0px,0px)';
      this.pos += 100;
    }
  }
};

slide_position.slider();

let scroll = {
  // make css move animation
  status: true,
  pos_start: -70,
  pos_end: -110,
  right: function right() {
    // right direction animation
    if (scroll.status) {
      teleportRight.tep(); // trigger last slide teleport
      scroll.status = false; // block many trigger at one time
      slider = document.getElementsByClassName('slider');
      slider[0].style.animationName = 'scroll_right'; // set css animation to right direction
      setTimeout(function() {
        let root = document.documentElement;
        scroll.pos_start -= 40;
        root.style.setProperty('--pos_start', scroll.pos_start + 'vw'); // change css animation value
        scroll.pos_end -= 40;
        root.style.setProperty('--pos_end', scroll.pos_end + 'vw'); // change css animation value
        slider[0].style.animationName = '';
        scroll.status = true;
      }, 400);
    }
  },

  left: function left() {
    // left direction animation
    if (scroll.status) {
      teleportLeft.tep(); // trigger last slide teleport
      scroll.status = false; // block many trigger at one time
      let root = document.documentElement;
      scroll.pos_end += 40;
      root.style.setProperty('--pos_end', scroll.pos_end + 'vw'); // change css animation value
      scroll.pos_start += 40;
      root.style.setProperty('--pos_start', scroll.pos_start + 'vw'); // change css animation value
      slider = document.getElementsByClassName('slider');
      slider[0].style.animationName = 'scroll_left'; // set css animation to left direction
      setTimeout(function() {
        slider[0].style.animationName = '';
        scroll.status = true;
      }, 400);
    }
  }
};

document.addEventListener('keyup', function(e) {
  if (e.defaultPrevented) {
    return;
  }

  var key = e.key || e.keyCode;

  if (key == 'ArrowLeft') {
    scroll.left();
  }
  if (key == 'ArrowRight') {
    scroll.right();
  }
});

let teleportLeft = {
  tep: function tep() {
    let slide = document.getElementsByClassName('slide');
    let first_pos = slide[frame.left].style.transform;
    let frst_pos = '';
    function clear() {
      first_pos = first_pos.split('');
      for (var i = 0; i < 12; i++) {
        first_pos.shift();
      }
      for (var i = 0; i < 12; i++) {
        first_pos.pop();
      }
      for (var i = 0; i < first_pos.length; i++) {
        frst_pos += first_pos[i];
      }
      frst_pos = parseInt(frst_pos);
    }
    clear();
    let new_pos = frst_pos - 100;
    slide[frame.right].style.transform = 'translate3d(' + new_pos + '%,0px,0px)';
    frame.moveLeft();
  }
};

let teleportRight = {
  tep: function tep() {
    let slide = document.getElementsByClassName('slide');
    let first_pos = slide[frame.right].style.transform;
    let frst_pos = '';
    function clear() {
      first_pos = first_pos.split('');
      for (var i = 0; i < 12; i++) {
        first_pos.shift();
      }
      for (var i = 0; i < 12; i++) {
        first_pos.pop();
      }
      for (var i = 0; i < first_pos.length; i++) {
        frst_pos += first_pos[i];
      }
      frst_pos = parseInt(frst_pos);
    }
    clear();
    let new_pos = frst_pos + 100;
    slide[frame.left].style.transform = 'translate3d(' + new_pos + '%,0px,0px)';
    frame.moveRight();
  }
};

let frame = {
  left: 0,
  right: 5,
  moveLeft: function moveLeft() {
    if (frame.left == 0) {
      frame.left = 5;
    } else {
      frame.left--;
    }
    if (frame.right == 0) {
      frame.right = 5;
    } else {
      frame.right--;
    }
  },
  moveRight: function moveLeft() {
    if (frame.left == 5) {
      frame.left = 0;
    } else {
      frame.left++;
    }
    if (frame.right == 5) {
      frame.right = 0;
    } else {
      frame.right++;
    }
  }
};

let leftArrow = document.getElementsByClassName('arrow-left');
leftArrow[0].addEventListener('click', scroll.left);

let rightArrow = document.getElementsByClassName('arrow-right');
rightArrow[0].addEventListener('click', scroll.right);
