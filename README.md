# Rise
Routines to manage the height of DIV element within a DOM page.  Think Bootstrap grid for the vertical.

A common issue with web layout is the need to control the height of elements within their parent elements.  Rise is a lightweight jQuery extension that allows for the defining the height of a DIV in respect to its parent DIV by assigning rise class values.

By assinging one of the following class definitions you can control the layout height of DIVs within each DIV's parent.
    rs-fixed:   Accept the rendered height of the current DIV and subtrack this height from all sibling DIVs.
    rs-full:    Raise the current DIV to the full height of the parent DIV expect for any fixed size DIVs.
    rs-break:   Raise the current DIV, but do not raise the children of this DIV

