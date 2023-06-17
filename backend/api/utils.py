import textwrap

def remove_one_indent(s):
    # split the string into lines
    lines = s.split('\n')
    # remove one level of indentation from each line
    lines = [line[1:] if line.startswith('\t') else line for line in lines]
    # join the lines back together
    s = '\n'.join(lines)
    return s

def generate_script(prompt_text):
    # Here, you should include the logic that generates a script based on the given prompt text
    # For now, I'll just return the prompt text

    

    generatedText = textwrap.dedent("""
from manim import *

class Generated(Scene):
    def construct(self):
        # Create axes
        axes = Axes(
            x_range=(-5, 5, 1),
            y_range=(-5, 5, 1),
            x_length=8,
            y_length=6,
            axis_config={"color": WHITE},
            x_axis_config={"include_numbers": True},
            y_axis_config={"include_numbers": True},
        )
        self.play(Create(axes))

        # Create a function graph
        graph = ParametricFunction(lambda t: [t, t**2, 0], color=BLUE, t_range=(-5, 5))
        self.play(Create(graph))

        # Add tangent line
        x_val = 2
        tangent_line = Line(
            start=axes.coords_to_point(x_val, x_val**2),
            end=axes.coords_to_point(x_val + 2, (x_val + 2)**2),
            color=GREEN,
        )
        self.play(Create(tangent_line))

        # Add labels
        dot = Dot(axes.coords_to_point(x_val, x_val**2), color=RED)
        x_label = axes.get_x_axis_label(Text(""), edge=DOWN)
        y_label = axes.get_y_axis_label(Text("f(x)"), edge=LEFT)
        self.play(Create(dot), Write(x_label), Write(y_label))

        # Add derivative label
        derivative_label = MathTex(r"f'(x) = 2x", color=YELLOW).next_to(dot, UP)
        self.play(Write(derivative_label))

        self.wait(2)
    """)

    return remove_one_indent(generatedText)

