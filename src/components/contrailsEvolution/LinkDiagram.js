import { linkHorizontal} from "d3";


export const LinkDiagram = ({links, name}) => {
  // console.log(name)
  return links.map(link => (
    <path className="pathCon"
      id={`${name}link${link.id}`}
      d={linkHorizontal()
          .source(d =>d.source)
          .target(d=>d.target)
          (link)
        }
    />
  ))};