// const mainNav = document.getElementById("menu-content");
// const isCollapse = [...mainNav.querySelectorAll(".collapse")];
// console.log(isCollapse)


const navLink = document.querySelectorAll('#menu-content .collapse');
console.log(navLink)

navLink.forEach((element) => {
  element.addEventListener('show.bs.collapse', function (e) {
  console.log(e)
  console.log('test!!!')

  const collapsd = document.querySelectorAll('.menu-content .collapsing');
  console.log(collapsd)

  if (collapsd.length) {
    return;
  }

  element.previousElementSibling.classList.add('active');

  const subMenu = document.querySelectorAll('#menu-content .sub-menu');
  console.log(subMenu)
  subMenu.collapse('hide')
})
})
