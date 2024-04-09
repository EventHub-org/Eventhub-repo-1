package org.eventhub.main.service.impl;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class OuterEventServiceImpl {

    public static void crawlContramarka() {
        Document doc = request("https://lviv.kontramarka.ua/uk");
        System.out.println("Contramarka: \n");

        for (Element element : doc.select(".block-info")) {
            // Parse title
            String title = element.select(".block-info__title").select("span").text();

            // Parse date
            //StringBuilder dateBuilder = new StringBuilder();
            Elements date = element.select(".dates > span");
            Elements time = element.select(".block-info__time");

            StringBuilder finalDate = new StringBuilder();
            finalDate.append(date);
            finalDate.append(time);

//            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("")


            String dateStr = date.text();
            String timeStr = time.text().substring(0,5);
//            String timeStr = time.text();




            System.out.println(title);
            System.out.println(dateStr);
            System.out.println(timeStr);
            System.out.println("\n\n");

        }


    }
    public static Document request(String url) {
        try{
            Connection con = Jsoup.connect(url);
            Document doc = con
                    .userAgent("Google")
                    .get();
            if (con.response().statusCode() == 200) {
                // logs
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
