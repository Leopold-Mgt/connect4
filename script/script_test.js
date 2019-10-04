class Puissance4 {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.tray = Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.tray[i] = Array(this.cols).fill(0);
        }
        this.turn = 1;
        this.moves = 0;
        this.winner = null;
        this.setup();
        this.element.addEventListener('click', (e) => this.click(e));
        this.grid();
    }

    setup() {
        let form = document.createElement('form');
        document.body.appendChild(form);
        form.setAttribute('method', 'get');
        form.setAttribute('action', 'index.html');

        let label_rows = document.createElement('label');
        let select_rows = document.createElement('select');
        let option_6_rows = document.createElement('option');
        let option_7_rows = document.createElement('option');
        let option_8_rows = document.createElement('option');
        label_rows.innerHTML = 'Rangées';
        option_6_rows.innerHTML = '6';
        option_7_rows.innerHTML = '7';
        option_8_rows.innerHTML = '8';
        form.appendChild(label_rows);
        form.appendChild(select_rows);
        select_rows.appendChild(option_6_rows);
        select_rows.appendChild(option_7_rows);
        select_rows.appendChild(option_8_rows);
        label_rows.setAttribute('for', 'select_rows');
        select_rows.setAttribute('id', 'select_rows');
        option_6_rows.setAttribute('value', 'row_6');
        option_7_rows.setAttribute('value', 'row_7');
        option_8_rows.setAttribute('value', 'row_8');

        let label_columns = document.createElement('label');
        let select_columns = document.createElement('select');
        let option_7_columns = document.createElement('option');
        let option_8_columns = document.createElement('option');
        let option_9_columns = document.createElement('option');
        label_columns.innerHTML = 'Colonnes';
        option_7_columns.innerHTML = '7';
        option_8_columns.innerHTML = '8';
        option_9_columns.innerHTML = '9';
        form.appendChild(label_columns);
        form.appendChild(select_columns);
        select_columns.appendChild(option_7_columns);
        select_columns.appendChild(option_8_columns);
        select_columns.appendChild(option_9_columns);
        label_columns.setAttribute('for', 'select_columns');
        select_columns.setAttribute('id', 'select_columns');
        option_7_columns.setAttribute('value', 'col_7');
        option_8_columns.setAttribute('value', 'col_8');
        option_9_columns.setAttribute('value', 'col_9');

        let label_player1 = document.createElement('label');
        let select_player1 = document.createElement('select');
        let option_red_player1 = document.createElement('option');
        let option_green_player1 = document.createElement('option');
        let option_yellow_player1 = document.createElement('option');
        label_player1.innerHTML = 'Joueur 1';
        option_red_player1.innerHTML = 'Rouge';
        option_green_player1.innerHTML = 'Vert';
        option_yellow_player1.innerHTML = 'Jaune';
        form.appendChild(label_player1);
        form.appendChild(select_player1);
        select_player1.appendChild(option_red_player1);
        select_player1.appendChild(option_green_player1);
        select_player1.appendChild(option_yellow_player1);
        label_rows.setAttribute('for', 'select_player1');
        select_player1.setAttribute('id', 'select_player1');
        option_red_player1.setAttribute('value', 'pl1_red');
        option_green_player1.setAttribute('value', 'pl1_green');
        option_yellow_player1.setAttribute('value', 'pl1_yellow');

        let label_player2 = document.createElement('label');
        let select_player2 = document.createElement('select');
        let option_red_player2 = document.createElement('option');
        let option_green_player2 = document.createElement('option');
        let option_yellow_player2 = document.createElement('option');
        label_player2.innerHTML = 'Joueur 2';
        option_red_player2.innerHTML = 'Jaune';
        option_green_player2.innerHTML = 'Rouge';
        option_yellow_player2.innerHTML = 'Vert';
        form.appendChild(label_player2);
        form.appendChild(select_player2);
        select_player2.appendChild(option_red_player2);
        select_player2.appendChild(option_green_player2);
        select_player2.appendChild(option_yellow_player2);
        label_rows.setAttribute('for', 'select_player2');
        select_player2.setAttribute('id', 'select_player2');
        option_red_player2.setAttribute('value', 'pl2_yellow');
        option_green_player2.setAttribute('value', 'pl2_red');
        option_yellow_player2.setAttribute('value', 'pl2_red');

        let submit = document.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'Envoyer');
        form.appendChild(submit);

        let div = document.createElement('div');
        div.className = 'p4';
        document.body.appendChild(div);
        this.element = document.querySelector('.p4');
    }

    grid() {
        let table = document.createElement('table');
        for (let i = this.rows - 1; i >= 0; i--) {
            let tr = table.appendChild(document.createElement('tr'));
            for (let j = 0; j < this.cols; j++) {
                let td = tr.appendChild(document.createElement('td'));
                let colour = this.tray[i][j];
                if (colour)
                    td.className = 'player' + colour;
                td.dataset.column = j;
            }
        }
        this.element.innerHTML = '';
        this.element.appendChild(table);
    }

    set(row, column, player) {
        this.tray[row][column] = player;
        this.moves++;
    }

    play(column) {
        let row;
        for (let i = 0; i < this.rows; i++) {
            if (this.tray[i][column] === 0) {
                row = i;
                break;
            }
        }
        if (row === undefined) {
            return null;
        } else {
            this.set(row, column, this.turn);
            return row;
        }
    }

    click(e) {
        if (this.winner !== null) {
            if (window.confirm("Puissance 4 !")) {
                this.reset();
                this.grid();
            }
        }

        let column = e.target.dataset.column;
        if (column !== undefined) {
            column = parseInt(column);
            let row = this.play(parseInt(column));

            if (this.win(row, column, this.turn)) {
                this.winner = this.turn;
            } else if (this.moves >= this.rows * this.columns) {
                this.winner = 0;
            }
            this.turn = 3 - this.turn;
            this.grid();
        }
    }

    win(row, column, player) {
        let count = 0;
        for (let j = 0; j < this.cols; j++) {
            count = (this.tray[row][j] === player) ? count + 1 : 0;
            if (count >= 4) {
                return true;
            }
        }
        count = 0;
        for (let i = 0; i < this.rows; i++) {
            count = (this.tray[i][column] === player) ? count + 1 : 0;
            if (count >= 4) {
                return true;
            }
        }
        count = 0;
        let sum = row - column;
        for (let i = Math.max(sum, 0); i < Math.min(this.rows, this.cols + sum); i++) {
            count = (this.tray[i][i - sum] === player) ? count + 1 : 0;
            if (count >= 4) {
                return true;
            }
        }
        count = 0;
        sum = row + column;
        for (let i = Math.max(sum - this.cols + 1, 0); i < Math.min(this.rows, sum + 1); i++) {
            count = (this.tray[i][sum - i] === player) ? count + 1 : 0;
            if (count >= 4) {
                return true;
            }
        }
    }

    reset() {
        document.location.reload(true);
        this.move = 0;
    }
}

let p4 = new Puissance4(6, 7);