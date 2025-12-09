document.addEventListener('DOMContentLoaded', function() {
    const tableCells = document.querySelectorAll('table td');
    const elementCells = [];

    tableCells.forEach(cell => {
        const text = cell.textContent.trim();
        if (text && text.length <= 2 && text.match(/^[A-Z][a-z]?$/)) {
            elementCells.push(cell);
            
            if (!cell.hasAttribute('data-symbol')) {
                const elementData = getElementData(text);
                if (elementData) {
                    cell.setAttribute('data-symbol', elementData.symbol);
                    cell.setAttribute('data-name', elementData.name);
                    cell.setAttribute('data-number', elementData.number);
                    cell.setAttribute('data-weight', elementData.weight);
                }
            }
        }
    });
    
    const dropdown = document.createElement('div');
    dropdown.id = 'elementDropdown';
    dropdown.style.cssText = `
        display: none;
        position: absolute;
        background: white;
        border: 2px solid #3498db;
        border-radius: 8px;
        padding: 15px;
        min-width: 250px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-family: Arial, sans-serif;
    `;
    
    dropdown.innerHTML = `
        <div style="margin-bottom: 10px;">
            <h2 style="color: #2c3e50; font-size: 2em; margin: 0 0 5px 0; text-align: center;" id="dropdownSymbol"></h2>
            <h3 style="color: #34495e; margin: 0 0 15px 0; text-align: center;" id="dropdownName"></h3>
        </div>
        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #3498db;">
            <p style="margin: 8px 0; font-size: 1em; color: #2c3e50;">
                <strong style="color: #3498db;">Atomic Number:</strong> 
                <span id="dropdownNumber"></span>
            </p>
            <p style="margin: 8px 0; font-size: 1em; color: #2c3e50;">
                <strong style="color: #3498db;">Atomic Weight:</strong> 
                <span id="dropdownWeight"></span>
            </p>
            <p style="margin: 8px 0; font-size: 1em; color: #2c3e50;">
                <strong style="color: #3498db;">Period:</strong> 
                <span id="dropdownPeriod"></span>
            </p>
            <p style="margin: 8px 0; font-size: 1em; color: #2c3e50;">
                <strong style="color: #3498db;">Group:</strong> 
                <span id="dropdownGroup"></span>
            </p>
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <button id="closeDropdown" style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 0.9em;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(dropdown);
    
    const closeDropdownBtn = document.getElementById('closeDropdown');
    
    function getElementData(symbol) {
        const elementDatabase = {
            'H': { name: 'Hydrogen', number: '1', weight: '1.008' },
            'He': { name: 'Helium', number: '2', weight: '4.0026' },
            'Li': { name: 'Lithium', number: '3', weight: '6.94' },
            'Be': { name: 'Beryllium', number: '4', weight: '9.0122' },
            'B': { name: 'Boron', number: '5', weight: '10.81' },
            'C': { name: 'Carbon', number: '6', weight: '12.011' },
            'N': { name: 'Nitrogen', number: '7', weight: '14.007' },
            'O': { name: 'Oxygen', number: '8', weight: '15.999' },
            'F': { name: 'Fluorine', number: '9', weight: '18.998' },
            'Ne': { name: 'Neon', number: '10', weight: '20.180' },
            'Na': { name: 'Sodium', number: '11', weight: '22.990' },
            'Mg': { name: 'Magnesium', number: '12', weight: '24.305' },
            'Al': { name: 'Aluminium', number: '13', weight: '26.982' },
            'Si': { name: 'Silicon', number: '14', weight: '28.085' },
            'P': { name: 'Phosphorus', number: '15', weight: '30.974' },
            'S': { name: 'Sulfur', number: '16', weight: '32.06' },
            'Cl': { name: 'Chlorine', number: '17', weight: '35.45' },
            'Ar': { name: 'Argon', number: '18', weight: '39.948' },
            'K': { name: 'Potassium', number: '19', weight: '39.098' },
            'Ca': { name: 'Calcium', number: '20', weight: '40.078' },
            'Sc': { name: 'Scandium', number: '21', weight: '44.956' },
            'Ti': { name: 'Titanium', number: '22', weight: '47.867' },
            'V': { name: 'Vanadium', number: '23', weight: '50.942' },
            'Cr': { name: 'Chromium', number: '24', weight: '51.996' },
            'Mn': { name: 'Manganese', number: '25', weight: '54.938' },
            'Fe': { name: 'Iron', number: '26', weight: '55.845' },
            'Co': { name: 'Cobalt', number: '27', weight: '58.933' },
            'Ni': { name: 'Nickel', number: '28', weight: '58.693' },
            'Cu': { name: 'Copper', number: '29', weight: '63.546' },
            'Zn': { name: 'Zinc', number: '30', weight: '65.38' },
            'Ga': { name: 'Gallium', number: '31', weight: '69.723' },
            'Ge': { name: 'Germanium', number: '32', weight: '72.630' },
            'As': { name: 'Arsenic', number: '33', weight: '74.922' },
            'Se': { name: 'Selenium', number: '34', weight: '78.971' },
            'Br': { name: 'Bromine', number: '35', weight: '79.904' },
            'Kr': { name: 'Krypton', number: '36', weight: '83.798' },
            'Rb': { name: 'Rubidium', number: '37', weight: '85.468' },
            'Sr': { name: 'Strontium', number: '38', weight: '87.62' },
            'Y': { name: 'Yttrium', number: '39', weight: '88.906' },
            'Zr': { name: 'Zirconium', number: '40', weight: '91.224' },
            'Nb': { name: 'Niobium', number: '41', weight: '92.906' },
            'Mo': { name: 'Molybdenum', number: '42', weight: '95.95' },
            'Tc': { name: 'Technetium', number: '43', weight: '98' },
            'Ru': { name: 'Ruthenium', number: '44', weight: '101.07' },
            'Rh': { name: 'Rhodium', number: '45', weight: '102.91' },
            'Pd': { name: 'Palladium', number: '46', weight: '106.42' },
            'Ag': { name: 'Silver', number: '47', weight: '107.87' },
            'Cd': { name: 'Cadmium', number: '48', weight: '112.41' },
            'In': { name: 'Indium', number: '49', weight: '114.82' },
            'Sn': { name: 'Tin', number: '50', weight: '118.71' },
            'Sb': { name: 'Antimony', number: '51', weight: '121.76' },
            'Te': { name: 'Tellurium', number: '52', weight: '127.60' },
            'I': { name: 'Iodine', number: '53', weight: '126.90' },
            'Xe': { name: 'Xenon', number: '54', weight: '131.29' },
            'Cs': { name: 'Caesium', number: '55', weight: '132.91' },
            'Ba': { name: 'Barium', number: '56', weight: '137.33' },
            'Hf': { name: 'Hafnium', number: '72', weight: '178.49' },
            'Ta': { name: 'Tantalum', number: '73', weight: '180.95' },
            'W': { name: 'Tungsten', number: '74', weight: '183.84' },
            'Re': { name: 'Rhenium', number: '75', weight: '186.21' },
            'Os': { name: 'Osmium', number: '76', weight: '190.23' },
            'Ir': { name: 'Iridium', number: '77', weight: '192.22' },
            'Pt': { name: 'Platinum', number: '78', weight: '195.08' },
            'Au': { name: 'Gold', number: '79', weight: '196.97' },
            'Hg': { name: 'Mercury', number: '80', weight: '200.59' },
            'Tl': { name: 'Thallium', number: '81', weight: '204.38' },
            'Pb': { name: 'Lead', number: '82', weight: '207.2' },
            'Bi': { name: 'Bismuth', number: '83', weight: '208.98' },
            'Po': { name: 'Polonium', number: '84', weight: '209' },
            'At': { name: 'Astatine', number: '85', weight: '210' },
            'Rn': { name: 'Radon', number: '86', weight: '222' },
            'Fr': { name: 'Francium', number: '87', weight: '223' },
            'Ra': { name: 'Radium', number: '88', weight: '226' },
            'Rf': { name: 'Rutherfordium', number: '104', weight: '267' },
            'Db': { name: 'Dubnium', number: '105', weight: '268' },
            'Sg': { name: 'Seaborgium', number: '106', weight: '269' },
            'Bh': { name: 'Bohrium', number: '107', weight: '270' },
            'Hs': { name: 'Hassium', number: '108', weight: '269' },
            'Mt': { name: 'Meitnerium', number: '109', weight: '278' },
            'Ds': { name: 'Darmstadtium', number: '110', weight: '281' },
            'Rg': { name: 'Roentgenium', number: '111', weight: '282' },
            'Cn': { name: 'Copernicium', number: '112', weight: '285' },
            'Nh': { name: 'Nihonium', number: '113', weight: '286' },
            'Fl': { name: 'Flerovium', number: '114', weight: '289' },
            'Mc': { name: 'Moscovium', number: '115', weight: '290' },
            'Lv': { name: 'Livermorium', number: '116', weight: '293' },
            'Ts': { name: 'Tennessine', number: '117', weight: '294' },
            'Og': { name: 'Oganesson', number: '118', weight: '294' }
        };
        
        if (elementDatabase[symbol]) {
            return {
                symbol: symbol,
                name: elementDatabase[symbol].name,
                number: elementDatabase[symbol].number,
                weight: elementDatabase[symbol].weight
            };
        }
        return null;
    }
    
    function showElementDropdown(elementCell, event) {
        const symbol = elementCell.getAttribute('data-symbol');
        const name = elementCell.getAttribute('data-name');
        const number = elementCell.getAttribute('data-number');
        const weight = elementCell.getAttribute('data-weight');
        
        if (!symbol) {
            console.error('No symbol found for element');
            return;
        }
        
        const periodRow = elementCell.parentElement;
        const period = periodRow.querySelector('th').textContent;
        
        const cellIndex = Array.from(periodRow.children).indexOf(elementCell);
        const groupHeaders = document.querySelector('tr').children;
        let group = '';
        
        for (let i = 0; i < groupHeaders.length; i++) {
            if (groupHeaders[i].colSpan) {
                const colspan = parseInt(groupHeaders[i].colSpan);
                if (cellIndex >= i && cellIndex < i + colspan) {
                    group = groupHeaders[i].textContent;
                    break;
                }
            } else if (i === cellIndex) {
                group = groupHeaders[i].textContent;
                break;
            }
        }
        
        document.getElementById('dropdownSymbol').textContent = symbol;
        document.getElementById('dropdownName').textContent = name;
        document.getElementById('dropdownNumber').textContent = number;
        document.getElementById('dropdownWeight').textContent = weight;
        document.getElementById('dropdownPeriod').textContent = period;
        document.getElementById('dropdownGroup').textContent = group || 'Not specified';
        
        const rect = elementCell.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + window.scrollY + 5) + 'px';
        dropdown.style.left = (rect.left + window.scrollX - 100) + 'px'; // Center it
        
        dropdown.style.display = 'block';
        
        event.stopPropagation();
    }
    
    function hideElementDropdown() {
        dropdown.style.display = 'none';
    }
    
    elementCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#3498db';
            this.style.color = 'white';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#ecf0f1';
            this.style.color = 'black';
        });
        
        cell.addEventListener('click', function(event) {
            console.log('Clicked element:', this.textContent);
            hideElementDropdown();
            
            showElementDropdown(this, event);
        });
    });
    
    closeDropdownBtn.addEventListener('click', function(event) {
        hideElementDropdown();
        event.stopPropagation();
    });
    
    document.addEventListener('click', function(event) {
        if (dropdown.style.display === 'block' && 
            !dropdown.contains(event.target)) {
            hideElementDropdown();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.style.display === 'block') {
            hideElementDropdown();
        }
    });
});
