package org.eventhub.main.service.impl;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class OuterEventServiceImpl {

    public static void crawlContramarka(int level, String url, ArrayList<String> visited) {



        if (level <= 5) {
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
                        String date = eventDoc.select(".red-square").text();
                        System.out.println(date);

                        // Parse location
                        String location = eventDoc.select(".event-card__address").text();
                        System.out.println(location);

                        // Parse img
                        Element eventInfoContainer = eventDoc.selectFirst(".event-card");
                        String imageSrc = eventInfoContainer.selectFirst("img").attr("data-src");
                        System.out.println(imageSrc);

                        System.out.println("\n");


//                        crawlContramarka(level++, next_link, visited);
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
