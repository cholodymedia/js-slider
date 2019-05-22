let slide_position = {
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
  status: true,
  pos_start: -70,
  pos_end: -110,
  right: function right() {
    if (scroll.status) {
      teleportRight.tep();
      scroll.status = false;
      slider = document.getElementsByClassName('slider');
      slider[0].style.animationName = 'scroll_right';
      setTimeout(function() {
        let root = document.documentElement;
        scroll.pos_start -= 40;
        root.style.setProperty('--pos_start', scroll.pos_start + 'vw');
        scroll.pos_end -= 40;
        root.style.setProperty('--pos_end', scroll.pos_end + 'vw');
        slider[0].style.animationName = '';
        scroll.status = true;
      }, 800);
    }
  },

  left: function left() {
    if (scroll.status) {
      teleportLeft.tep();
      scroll.status = false;
      let root = document.documentElement;
      scroll.pos_end += 40;
      root.style.setProperty('--pos_end', scroll.pos_end + 'vw');
      scroll.pos_start += 40;
      root.style.setProperty('--pos_start', scroll.pos_start + 'vw');
      slider = document.getElementsByClassName('slider');
      slider[0].style.animationName = 'scroll_left';
      setTimeout(function() {
        slider[0].style.animationName = '';
        scroll.status = true;
      }, 800);
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
