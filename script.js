const field = document.querySelector('[data-todo="field"]');
const addBtn = document.querySelector('[data-todo="add"]');
const list = document.querySelector('[data-todo="list"]');
const listItem = document.querySelector('[data-todo="listItem"]');
const themeSelector = document.querySelector('[data-theme="selector"]');
const html = document.documentElement;

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

            saveValues(`listItemCheck ${this.parentElement.getAttribute('data-itemid')}`, this.parentElement.classList.contains('checked'));
         }
         function handleDeleteItem() {
            this.parentElement.remove();

            checkBtn.removeEventListener('click', handleCheckItem);
            deleteBtn.removeEventListener('click', handleDeleteItem);

            delete window.localStorage[`listItemText ${this.parentElement.dataset.itemid}`];
            delete window.localStorage[`listItemCheck ${this.parentElement.dataset.itemid}`];
            
            if (!list.children[1]) {
               listItemId = 0;
            }
         }

         checkBtn.addEventListener('click', handleCheckItem);
         deleteBtn.addEventListener('click', handleDeleteItem);

         newItem.setAttribute('data-itemid', listItemId);

         if (!window.localStorage[`listItemText ${listItemId}`]) {
            saveValues(`listItemText ${listItemId}`, newItem.children[2].innerText);
            saveValues(`listItemCheck ${listItemId}`, newItem.classList.contains('checked'));
         }

         listItemId++;
      }
   }

   let listItemId = 0;
   addBtn.addEventListener('click', handleAddItem);

   //THEME SELECTOR
   function changeTheme() {
      themeSelector.addEventListener('change', () => {
         if (themeSelector.value !== 'standard') {
            html.setAttribute('class', `js theme-${themeSelector.value}`);
         } else {
            html.setAttribute('class', `js`);
         }

         saveValues('theme', themeSelector.value);
      });
   }
   changeTheme();

   //LOCAL STORAGE
   function saveValues(name, value) {
      window.localStorage[name] = value;
   }
   function setValues() {
      const properties = Object.entries(window.localStorage);

      properties.forEach((item) => {
         if (item[0] === 'theme' && item[1] !== 'standard') {
            html.setAttribute('class', `js theme-${item[1]}`);

            const element = document.querySelector(`option[value="${item[1]}"]`);
            element.setAttribute('selected', '');
         }
         if (item[0].includes('listItemText')) {
            field.value = item[1];
            let actualId = item[0].split(' ');
            listItemId = actualId[1];

            handleAddItem();

            listItemId += 1000;
         }
      });

      properties.forEach((item) => {
         if (item[0].includes('listItemCheck') && item[1] === 'true') {
            let actualId = item[0].split(' ');
            const actualItem = list.querySelector(`[data-itemid="${actualId[1]}"]`)
            
            actualItem.classList.add('checked');
            list.appendChild(actualItem);
         }
      });
   }
   setValues();

} else {
   window.location.reload();
}