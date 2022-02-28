const field = document.querySelector('[data-todo="field"]');
const addBtn = document.querySelector('[data-todo="add"]');
const list = document.querySelector('[data-todo="list"]');
const listItem = document.querySelector('[data-todo="listItem"]');

if (field) {
   function handleAddItem() {
      if (field.value) {
         const newItem = listItem.cloneNode(true);
         newItem.children[2].innerText = field.value;

         listItem.insertAdjacentElement('afterend', newItem);
         field.value = '';

         const deleteBtn = newItem.querySelector('[data-todo="delete"]');
         const checkBtn = newItem.querySelector('[data-todo="checkbox"]');

         function handleCheckItem() {
            this.parentElement.classList.toggle('checked');
            if (!this.parentElement.classList.contains('checked')) {
               listItem.insertAdjacentElement('afterend', this.parentElement);
            } else {
               list.appendChild(this.parentElement);
            }
         }
         function handleDeleteItem() {
            this.parentElement.remove();

            checkBtn.removeEventListener('click', handleCheckItem);
            deleteBtn.removeEventListener('click', handleDeleteItem);
         }

         checkBtn.addEventListener('click', handleCheckItem);
         deleteBtn.addEventListener('click', handleDeleteItem);
      }
   }

   addBtn.addEventListener('click', handleAddItem);

   //THEME SELECTOR
   function changeTheme() {
      const themeSelector = document.querySelector('[data-theme="selector"]');

      themeSelector.addEventListener('change', () => {
         const html = document.documentElement;

         if (themeSelector.value !== 'standard') {
            html.setAttribute('class', `js theme-${themeSelector.value}`);
         } else {
            html.setAttribute('class', `js`);
         }
      });
   }
   changeTheme();

} else {
   window.location.reload();
}