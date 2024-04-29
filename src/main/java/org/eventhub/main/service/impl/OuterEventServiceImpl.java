package org.eventhub.main.service.impl;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;



import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class OuterEventServiceImpl {

    public static void crawlContramarka(String url, ArrayList<String> visited) {

        System.out.println("Contramarka: \n");

        Document doc = request(url, visited);
        if (doc != null) {
            for (Element link : doc.select(".cat_item__image")) {
                String next_link = link.absUrl("href");
//                    System.out.println("Next link" + next_link);
                if (!visited.contains(next_link)) {
                    Document eventDoc = request(next_link, visited);

                    // Parse title
                    String title = eventDoc.select(".event-card__title").text();
                    System.out.println(title);

                    // Parse date
                    String dateStr = eventDoc.select(".red-square").text();
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMMM yyyy", new Locale("uk"));
                    LocalDate startDate;
                    LocalDate expireDate;

                    if (dateStr.contains("-")) {
                        String[] strParts = dateStr.split(" - ");
                        String[] dateSecondSplit = strParts[1].split(" ");

                        StringBuilder startDateBuilder = new StringBuilder();
                        startDateBuilder.append(strParts[0]);

                        startDateBuilder.append(" ");
                        startDateBuilder.append(dateSecondSplit[1]);
                        startDateBuilder.append(" ");
                        startDateBuilder.append(dateSecondSplit[2]);


                        startDate = LocalDate.parse(startDateBuilder.toString(), formatter);

                        expireDate = LocalDate.parse(strParts[1], formatter);
                    } else {
                        startDate = LocalDate.parse(dateStr, formatter);
                        expireDate = startDate;
                    }

                    System.out.println("Start at: " + startDate);
                    System.out.println("Expire at: " + expireDate);

                    // Parse location
                    String location = eventDoc.select(".event-card__address").text();
                    System.out.println(location);

                    // Parse img
                    Element eventInfoContainer = eventDoc.selectFirst(".event-card");
                    String imageSrc = eventInfoContainer.selectFirst("img").attr("data-src");
                    System.out.println(imageSrc);

                    // Parse description
                    Element descriptionContainer = eventDoc.selectFirst(".afisha-about");
                    if (descriptionContainer != null) {
                        Element content = descriptionContainer.selectFirst(".content_cut");
                        StringBuilder builder = new StringBuilder();
                        for (Element p : content.select("p")) {
                            builder.append(p.text());
                            builder.append("\n\n");
                        }
                        String description = builder.toString();
                        System.out.println(description);
                    }


                    System.out.println("\n");
                }
            }
//                for (Element element : doc.select(".block-info")) {
//                    // Parse title
//                    String title = element.select(".block-info__title").select("span").text();
//
//                    // Parse date
//                    //StringBuilder dateBuilder = new StringBuilder();
//                    Elements date = element.select(".dates > span");
//                    Elements time = element.select(".block-info__time");
//
//                    StringBuilder finalDate = new StringBuilder();
//                    finalDate.append(date);
//                    finalDate.append(time);
//
////            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("")
//
//
//                    String dateStr = date.text();
//                    String timeStr = time.text().substring(0, 5);
////            String timeStr = time.text();
//
//
//                    System.out.println(title);
//                    System.out.println(dateStr);
//                    System.out.println(timeStr);
//                    System.out.println("\n\n");
//
//                }
//
        }



    }
    public static Document request(String url, ArrayList<String> v) {
        try{
            Connection con = Jsoup.connect(url);
            Document doc = con
                    .userAgent("Google")
                    .get();
            if (con.response().statusCode() == 200) {
                // logs
                v.add(url);
                return doc;
            }
            return null;
        }
        catch (IOException e) {
            System.out.println(e.toString());
            return null;
        }

    }
}
