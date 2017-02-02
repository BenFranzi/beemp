function messageDialogToggle(div) {
  var element    = document.getElementById(div),
      style      = window.getComputedStyle(element),
      visibility = style.getPropertyValue('visibility')

      visibility == 'hidden' ? mDialogVisible(element) : mDialogHidden(element)
}

function mDialogVisible(div) {
  div.style.visibility = 'visible'
}

function mDialogHidden(div) {
  div.style.visibility = 'hidden'
}
