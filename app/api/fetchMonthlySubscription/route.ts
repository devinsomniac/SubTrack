import { db } from "@/Database";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const data = await db.execute(sql`
      WITH last_12_months AS (
  SELECT generate_series(
    date_trunc('month', CURRENT_DATE) - interval '11 months',
    date_trunc('month', CURRENT_DATE),
    interval '1 month'
  ) AS month_start
)
SELECT 
  to_char(l.month_start, 'Month') AS month,
  COALESCE(SUM(s."numberOfUsers"), 0) AS "New",
  COALESCE(SUM(a."numberOfUsers"), 0) AS "Archieve"
FROM last_12_months l
LEFT JOIN "subscription" s
  ON date_trunc('month', s."subscriptionStartDate") = l.month_start
LEFT JOIN "archievesubscription" a
  ON date_trunc('month', a."subscriptionEndDate") = l.month_start
GROUP BY l.month_start
ORDER BY l.month_start;

    `);

        return NextResponse.json(data.rows); // Return the fetched data
    } catch (err) {
        console.error("There has been an error in fetching monthly Subscription:", err);
        return NextResponse.json(
            { error: "Failed to fetch monthly subscription data" },
            { status: 500 }
        );
    }
}
