import textwrap

from langchain import PromptTemplate, OpenAI, LLMChain, ConversationChain
from langchain.chat_models import ChatOpenAI


def remove_one_indent(s):
    # split the string into lines
    lines = s.split('\n')
    # remove one level of indentation from each line
    lines = [line[1:] if line.startswith('\t') else line for line in lines]
    # join the lines back together
    s = '\n'.join(lines)
    return s

def get_code(prompt_text):

    from dotenv import load_dotenv, find_dotenv
    import os
    load_dotenv(find_dotenv())

    template = """
    Make a basic explanation in manim for a certain concept.
    The manim code will use only primary shapes in manim, Text and Create ( not Tex, not ShowCreation ).
    If you want to scale something use .scale() and not put scale as a parameter
    The code will have only one class called Generated
    Give me the code and only the code, not a single other comment or anything else
    Make sure to also import * from manim at the top
    At the end of the animation put a wait() statement
    Also very very important, make sure to create animations in the style of 3 blue 1 brown for any prompt
    so you need to animate thing on the screen other than text
    Also follow the following rules:
    1. You will use only the following mobjects: Text, Line, Arrows, Rectangle, Square, Circles, Triangles and you can also create XOY axis
    2. You will use only the following methods: .scale(), .shift(), .rotate(), .flip(), .next_to(), .to_edge(), .align_to(), .add_updater(), .clear_updaters(), .set_color(), .set_fill(), .set_stroke(), .set_opacity(), .set_width(), .set_height(), 
    3. Do not use get_graph() as it is deprecated, use .plot() instead
    
    
    the task you need to explain is:
    {input}
    """

    llm = ChatOpenAI(temperature=0.25, model='gpt-4', max_tokens=6000)
    prompt_template = PromptTemplate.from_template(template=template)
    task_expander = LLMChain(llm=llm, prompt=prompt_template)
    output = task_expander.run(input=prompt_text)

    return output



def generate_script(prompt_text):
    # Here, you should include the logic that generates a script based on the given prompt text
    # For now, I'll just return the prompt text
    result = get_code(prompt_text)


    generatedText = textwrap.dedent(result)

    return remove_one_indent(generatedText)

