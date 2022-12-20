---
sidebarDepth: 1
---

# Create an ADR

### Clone the repository
Clone the ADR repository on your local system.
```sh
git clone https://github.com/avantifellows/adr/
```

### Create a new branch with the number of ADR you need to create
Each ADR is given a number, which increases monotonically. Your branch name should be something like `ADR-3`.
```sh
git checkout -b ADR-N
```

### Duplicate the ADR template
Make sure you're in the `adr` root folder.
```sh
cp docs/guide/adr-template.md docs/adrs/ADR-NN.md
```

### Add the reference of the new file in the sidebar.
- Open `config.ts` file which lives in `adr/docs/.vuepress/config.ts`
- Edit the sidebar configuration by adding the new ADR file reference as shown below
```diff
   sidebar: [
      {
         title: "Introduction",
         collapsable: false,
         children: [
            "/guide/",
            "/guide/create-new-adr",
            ["/guide/adr-template", "ADR Template"]
         ],
      },
      {
         title: "ADRs",
         collapsable: false,
         children: [
            "/adrs/ADR-1",
+           "/adrs/ADR-2"
         ]
      }
   ],
```

### Write your content in the newly created file
Create your ADR here using the copied template. Make sure all sections are filled accordingly.

#### What about Diagrams?
Recommended way is to create diagrams using [DrawIO](https://app.diagrams.net/). It's free to use and just like Whimsical or any other drawing tool. The best part? You can export the file as an `SVG`, which you can re-upload to the DrawIO platform if you want to make any changes in the future. Make sure to save the image file in `docs/public` directory, with name something like `adr1_image3.svg`.

### Create a pull request
Create a pull request from your branch to main. Creating the PR will automatically deploy your changes to a staging site - [staging-adr.avantifellows.org](https://staging-adr.avantifellows.org)

### Merge main into release
Once the PR is approved and merged into main, merge the main branch into release to push the changes to prod
