import { linkHorizontal} from "d3";


export const LinkDiagram = ({links, name}) => {
  // console.log(name)
  return links.map(link => (
    <path id="pathCon"
      class={`${name}${link.id1} ${name}${link.id2}`}
      d={linkHorizontal()
          .source(d =>d.source)
          .target(d=>d.target)
          (link)
        }
    />
  ))};