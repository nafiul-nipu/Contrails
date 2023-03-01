import { linkHorizontal } from "d3";


export const LinkDiagram = ({ links, name }) => {
  console.log(links)
  return links.map(link => (
    <path id="pathCon"
      key={`${name}${link.id1} ${name}${link.id2}`}
      className={`${name}${link.id1} ${name}${link.id2}`}
      d={linkHorizontal()
        .source(d => d.source)
        .target(d => d.target)
        (link)
      }
    />
  ))
};