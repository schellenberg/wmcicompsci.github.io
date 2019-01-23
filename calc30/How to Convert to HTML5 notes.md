#Notes To Self
To convert all the swf files, and then link them properly, I did the following:
- installed swiffy-convert via npm
- used sublime edit to do a find/replace for all files in the directory -- found .swf and replaced it with .swf.html
- open a terminal
	- cd to main directory of math on wheels
	- execute the following command
		find . -name "*.swf" -exec swiffy-convert {} \;
	- be patient... this will take awhile

- to fix the embedded problem on the newer content (not applicable to the Calculus 30 stuff), I just applied the following regex to all files in the directory, replacing every instance with a space
    pluginsp\w.*flash.

- I have saved a copy of the current swiffy runtime in the main directory of this project. It isn't needed now, as all of the pages point to the Google hosted Swiffy runtime.js, but in case that ever goes away, the pages can be repointed to this local version.