// document-wide listener events

addEventListener('mousedown', (e) => {

    if (!e.target.classList.contains('dropdownoption') && !e.target.classList.contains('dropdown') && !e.target.classList.contains('dropdowndiv') && !e.target.classList.contains('dropdownUnderDiv')) {
        if (openDropdown != null) {
            openDropdown.classList.add('closed');
            openDropdown = null;
        }
    }

});

