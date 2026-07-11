from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from backend import Solve_Queens_Now, Parse_Canvas_Board
import ast

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/process', methods=["POST"])
def process():
    The_Big_B_D = request.get_json()
    Is_Valid_Board = Parse_Canvas_Board(The_Big_B_D)
    if Is_Valid_Board['Success']:
        The_Big_S = Solve_Queens_Now(The_Big_B_D)
        return redirect(url_for('solution', solution=The_Big_S))
    
    return redirect(url_for('error', mistakes=Is_Valid_Board))

@app.route('/solution')
def solution():
    The_Big_M = request.args.get('solution')
    The_Big_G = ast.literal_eval(The_Big_M)
    return render_template('solution.html', solution=The_Big_G)

@app.route('/error')
def error():
    The_Big_R = request.args.get('mistakes')
    print(The_Big_R)
    return render_template('error.html', error=The_Big_R['Message'])


if __name__ == '__main__':
    app.run(debug=True)