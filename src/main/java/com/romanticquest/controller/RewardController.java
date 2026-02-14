package com.romanticquest.controller;

import com.romanticquest.model.QuestProgress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RewardController {

    @Autowired
    private QuestProgress questProgress;

    @GetMapping("/reward")
    public String reward() {
        if (!questProgress.isJourneyStarted() || !questProgress.isAllPuzzlesCompleted()) {
            return "redirect:/";
        }

        return "reward";
    }
}
