## Services

This directory contains files intended to separate the "business logic" of my app from the rendering.
The React Native documentation suggests writing "[testable code](https://reactnative.dev/docs/testing-overview#writing-testable-code)", so I'm going to be trying to migrate as much logic as I can into this directory WHILE ALSO trying to avoid spaghettifying my code base.
One thing to note is that the files in this directory will be pure `ts` files, since no rendering should take place here.
