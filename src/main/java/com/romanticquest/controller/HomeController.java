package com.romanticquest.controller;

import com.romanticquest.model.QuestProgress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    @Autowired
    private QuestProgress questProgress;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @PostMapping("/start-journey")
    public String startJourney() {
        questProgress.reset();
        questProgress.setJourneyStarted(true);
        return "redirect:/quest/bitwise";
    }
}
