---
title: "The Min-Max Algorithm in Java"
date: 2018-11-28T11:50:17Z
description: Learn the min-max algorithm and how to implement it in this tutorial by Nisheeth Joshi, a researcher and the author of Hands-On Artificial Intelligence with Java for Beginners.
series: ai
image: ai.png
tags:
- ai
author: Nisheeth Joshi
twitter: https://twitter.com/nisheeth_joshi
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In order to understand the min-max algorithm, you should get familiar with game playing and game trees. Game playing can be classified as game trees. What is a game tree? A tree is made of a **root** node, and a root node has child nodes; each child node is subdivided into multiple children.

This forms a tree, and the terminal nodes are termed **leaves**, as shown in the following diagram:

In game play, our main goal is to win the game; in other words, we try to find the best possible solution by looking ahead in the game tree. The most important thing to note about playing a game is that we don't actually go down to a particular node (or down to a complete tree), and we don't play the entire game. We are at the root position, and we are looking for the best option that is available to us, in order to maximize our chances of winning the game.

Since we are performing game playing, we will take turns, just like in a game of chess or tic-tac-toe; we take a turn, and then our opponent takes a turn. This means that all of our children, or the children of a particular node, will be our opponent's move. Our opponent's objective will be to make us lose, because whatever the game tree that we are going to develop would be in our perspective. Therefore, from our perspective, on any particular move, our objective is to win the game; once our move is done, it will be our opponent's move. The opponent's move, in our perspective, will be to make us lose. Therefore, when looking ahead, we simply search the game tree.

Consider a tree with the following types of nodes:

* min nodes: These are our opponent's nodes
* max nodes: These are our nodes

In min nodes, we select the minimum cost successor. Out of all of the successors that we have for a particular node, we choose the minimum. In a max node, we try to find out the maximum successor, because the nodes are our moves.

Now, we are not actually moving to a particular point; we are only looking ahead, performing certain computations in the memory, and trying to find the best move possible. The terminal nodes are the winning or losing nodes, but it is often not feasible to search the terminal nodes; so, we apply heuristics to compare the non-terminal nodes. The following diagram illustrates our game tree:

We'll start at the root node, A. We have two options: either the right subtree or the left subtree. If we select either of the subtrees at random, our chances of losing the game become higher. To avoid this, we will apply certain heuristics, so that our chances of winning the game will increase. Therefore, we'll try to model the game. Suppose we select B; our opponent will have the option to select either D or E. If our opponent selects D, we'll have the option to select either Hor I. If our opponent chooses H, we will have the option to select either 10 or 11, this is the maximum that can be performed. Our computer system does not have the RAM to process any further; therefore, from this point, we'll apply heuristics.

In the preceding diagram, the heuristic values of all of the terminal nodes can be seen. The game is not ending, and we are only looking ahead. The heuristic values comprise the maximum depth that we can go for a look ahead; after them, we will apply heuristics. The chances of winning the game at particular points are, let's say, 10%, 11%, 9%, and so on. These are the terminal values that we have.

Now, suppose that our opponent selects the H node. This is a min node, and a min node will always choose a minimum out of its successors. Therefore, the min node will always choose 10, if choosing between 10 and 11. If we move ahead, we have 9 and 11; so, our opponent will select 9. Similarly, our opponent will select the rest of the nodes.

Now, it's our move. D, E, F, and G are the max nodes. The max nodes will always choose the maximum value out of their successors. Therefore, we will choose 10, 14, 2, and 20 as our nodes. Now it's our opponent's move again, and our opponent will always choose the minimum among his successors. This time, he will select 10 and 2. Finally, it is our turn, and we have a max node. We will choose the maximum value successor: 10. This is illustrated in the following diagram:

So, this is how the game play works.

# Implementing an example min-max algorithm

In this section, we will be implementing a min-max algorithm (a tic-tac-toe example). So, let's get to NetBeans. We will have an ArrayList, and we will apply randomization and take input. The following are the four classes that we'll be working with:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
```

Then, we have to define the x and y points. In a tic-tac-toe game, there are nine tiles, and, on a one-on-one basis with the opponent, the squares are filled, as shown here:

```java
class Point {

    int x, y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "[" + x + ", " + y + "]";
    }
}

class PointAndScore {

    int score;
    Point point;

    PointAndScore(int score, Point point) {
        this.score = score;
        this.point = point;
    }
}
```

So, we'll define Point, and the x and y points. This will give us the x and y values, onto which we have to enter the values. String will return us those values. PointAndScore will provide the point value and its score at each particular square, whether it is filled in or not.

The Board class will define the entire nine tiles and will take input; this will give us three states. Either X has won, or the person who has an X has won, or the person who has a 0 has won, and the available states, if the available states are Empty:

```java
class Board {

    List<Point> availablePoints;
    Scanner scan = new Scanner(System.in);
    int[][] board = new int[3][3];

    public Board() {
    }

    public boolean isGameOver() {
        return (hasXWon() || hasOWon() || getAvailableStates().isEmpty());
    }

    public boolean hasXWon() {
        if ((board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] == 1) || (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] == 1)) {
            return true;
        }
        for (int i = 0; i < 3; ++i) {
            if (((board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] == 1)
                    || (board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] == 1))) {
                return true;
            }
        }
        return false;
    }

    public boolean hasOWon() {
        if ((board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] == 2) || (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] == 2)) {
            return true;
        }
        for (int i = 0; i < 3; ++i) {
            if ((board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] == 2)
                    || (board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] == 2)) {
                return true;
            }
        }

        return false;
    }

    public List<Point> getAvailableStates() {
        availablePoints = new ArrayList<>();
        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                if (board[i][j] == 0) {
                    availablePoints.add(new Point(i, j));
                }
            }
        }
        return availablePoints;
    }

    public void placeAMove(Point point, int player) {
        board[point.x][point.y] = player; //player = 1 for X, 2 for O
    } 

    void takeHumanInput() {
        System.out.println("Your move: ");
        int x = scan.nextInt();
        int y = scan.nextInt();
        Point point = new Point(x, y);
        placeAMove(point, 2); 
    }

    public void displayBoard() {
        System.out.println();

        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();

        }
    } 

    Point computersMove; 

    public int minimax(int depth, int turn) { 
        if (hasXWon()) return +1; 
        if (hasOWon()) return -1;

        List<Point> pointsAvailable = getAvailableStates();
        if (pointsAvailable.isEmpty()) return 0; 

        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;

        for (int i = 0; i < pointsAvailable.size(); ++i) { 
            Point point = pointsAvailable.get(i); 
            if (turn == 1) { 
                placeAMove(point, 1); 
                int currentScore = minimax(depth + 1, 2);
                max = Math.max(currentScore, max);

                if(depth == 0)System.out.println("Score for position "+(i+1)+" = "+currentScore);
                if(currentScore >= 0){ if(depth == 0) computersMove = point;} 
                if(currentScore == 1){board[point.x][point.y] = 0; break;} 
                if(i == pointsAvailable.size()-1 && max < 0){if(depth == 0)computersMove = point;}
            } else if (turn == 2) {
                placeAMove(point, 2); 
                int currentScore = minimax(depth + 1, 1);
                min = Math.min(currentScore, min); 
                if(min == -1){board[point.x][point.y] = 0; break;}
            }
            board[point.x][point.y] = 0; //Reset this point
        } 
        return turn == 1?max:min;
    } 
}
```

If X has won, we have to check which values are equal, such as board [0] [0] is equal to [1] [1] and [0] [0] is equal to [2] [2]. This means that the diagonals are equal, or [0] [0] is equal to 1, or board 0is equal to [1] [1]. Either we have all of the diagonals, or we have any one of the horizontal lines, or we have all three squares in a vertical line. If this happens, we will return true; otherwise, we'll check the other values on the board. The following part of the code will check the values, and will return false if they do not comply with the preceding conditions:

```java
public boolean hasXWon() {
    if ((board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] == 1) || (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] == 1)) {
        return true;
    }
    for (int i = 0; i < 3; ++i) {
        if (((board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] == 1)
                    || (board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] == 1))) {
            return true;
        }
    }
    return false;
}
```

Next, we will see whether 0 has won; so, we will do the same thing for 0. Here, we will check whether the value is 2. Then, if nobody has won, we'll check the available states for the users, and we'll print them. We will then have placeAMove, and either player 1 will move or player 2 will move. 

Next, we have takeHumanInput; so, we'll take the human input for the x and y points, and we will display the board using the displayBoard method; finally, we'll apply a min-max algorithm. So, we'll check if X has won or if 0 has won; if not, we'll start playing the game, and we will print the score positions. Finally, in the mainclass, we'll start with who will make the first move (either the computer or the user). If our user starts a move, we have to provide the values in x and y coordinates (in an x and y plane); otherwise, the computer will start the move, and every time, we will have to check whether X has won. If X has won, we will print Unfortunately, you lost! if 0 has won, we will print You won! if both win, then we will print It's a draw!

Run the program to get the following output:

The preceding output is the initial position of the port. This has been printed at the initial point. Now, we have to select our turn. Suppose that we enter 1; we will get the following output:

 
The computer's turn was first, and the computer placed the position at [0] [0]. Now, it's our move; so, we place [0] [2]. This will enter 2 in the last position on our board, as shown in the following screenshot:

Our 2 has been placed at [0] [2]. The preceding screenshot shows our current positions. The computer has placed a mark on [1] [0]. Let's place a mark on [2] [0], as follows:

 
We now have a position over [2] [0] and have blocked the computer. Now, the computer has entered 1 at [1] [1]. Let's put a mark on [1] [2], and block the computer again:

The computer has entered 1 at [2] [2], and has won the game.
If you enjoyed reading this article and want to explore more about AI with Java, you can check out Hands-On Artificial Intelligence with Java for Beginners. Featuring numerous interesting examples, the book takes you through the concepts in a fun manner, so you can build intelligent apps using ML and DL with Deeplearning4j. 