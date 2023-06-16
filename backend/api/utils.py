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

    generatedText = textwrap.dedent(f"""
from manim import *
class Generated(Scene):
    def construct(self):
        text = Text('{prompt_text}')
        self.play(Write(text))
        self.wait()
    """)

    return remove_one_indent(generatedText)

