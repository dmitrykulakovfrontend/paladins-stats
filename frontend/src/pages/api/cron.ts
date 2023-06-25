// import type { NextApiRequest, NextApiResponse } from "next";
// import getMatchIdsByQueue from "~/utils/hirezAPI/getMatchIdsByQueue";
// import validateSession from "~/utils/hirezAPI/validateSession";
// import withErrorHandler from "../../utils/errorHandler";
// import { db } from "~/server/db";
// import { DateTime } from "luxon";

// export default withErrorHandler(async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const sessionID = await validateSession(req, res);
//   const newMatches = await getMatchIdsByQueue(sessionID, {
//     wholeDay: true,
//     date: DateTime.now().minus({ day: 1 }),
//   });

//   const formattedNewMatches = newMatches.map((match) => ({
//     match_id: +match.Match,
//     date: new Date(match.Entry_Datetime),
//     region: match.Region,
//   }));
//   const oldDateDay = DateTime.now().minus({ day: 8 }).toFormat("yyyy-MM-dd");
//   await db.transaction().execute(async (trx) => {
//     await trx
//       .deleteFrom("matches")
//       .where("date", "like", `%${oldDateDay}%`)
//       .executeTakeFirstOrThrow();

//     await trx
//       .insertInto("matches")
//       .values(formattedNewMatches)
//       .executeTakeFirstOrThrow();
//   });

//   res.status(200).json(formattedNewMatches);
// });
export { };