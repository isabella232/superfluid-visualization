import { useQuery, gql } from "@apollo/client";
import Graph from "./graph";
import leaderBoard from "./leaderboard";
import ConstructNodeAndLinkData from "./nodeAndLinkData";

const QUERY = gql`
  query Visualization {
    accountTokenSnapshots(
      where: {
        token: "0xcaa7349cea390f89641fe306d93591f87595dc1f"
        totalOutflowRate_gt: "0"
      }
      orderBy: totalOutflowRate
      orderDirection: desc
    ) {
      totalOutflowRate
      account {
        id
        outflows {
          receiver {
            id
          }
        }
      }
    }
  }
`;

export default function Visualize() {
  const { data, loading, error } = useQuery(QUERY, {
    pollInterval: 1000,
  });

  if (loading) {
    return (
      <h2>
        <a
          href="#loading"
          aria-hidden="true"
          className="aal_anchor"
          id="loading"
        >
          <svg
            aria-hidden="true"
            className="aal_svg"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }
  const nodeAndLinkData = ConstructNodeAndLinkData(data);
  return (
    <div className="grid grid-cols-10 w-full">
      {/* <div className="floating-qr">
        <img alt="bgt-qr" src="bgt-qr.png" />
      </div> */}
      <div className="col-span-10">{Graph(nodeAndLinkData)}</div>
      {/* <div className="col-span-3 p-10 bg-black">
        {leaderBoard(nodeAndLinkData)}
      </div> */}
    </div>
  );
}
